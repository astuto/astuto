class Rack::Attack
  ### Throttle Spammy Clients ###

  # If any single client IP is making tons of requests, then they're
  # probably malicious or a poorly-configured scraper. Either way, they
  # don't deserve to hog all of the app server's CPU. Cut them off!
  #
  # Note: If you're serving assets through rack, those requests may be
  # counted by rack-attack and this throttle may be activated too
  # quickly. If so, enable the condition to exclude them from tracking.

  # Throttle all requests by IP (60rpm) except API endpoints requests
  #
  # Key: "rack::attack:#{Time.now.to_i/:period}:req/ip:#{req.ip}"
  throttle('req/ip', limit: 300, period: 5.minutes) do |req|
    req.get_header("action_dispatch.remote_ip") unless req.path.start_with?('/api/v1/')
  end

  # Throttle requests to API endpoints by IP address
  throttle('api/ip', limit: 100, period: 5.minutes) do |req|
    if req.path.start_with?('/api/v1/')
      req.get_header("action_dispatch.remote_ip")
    end
  end

  # Throttle requests to API endpoints by api key
  throttle('api/key', limit: 100, period: 5.minutes) do |req|
    if req.path.start_with?('/api/v1/')
      authorization = req.get_header("HTTP_AUTHORIZATION")
      authorization&.split(' ')&.last if authorization.present?
    end
  end

  ### Prevent Brute-Force Login Attacks ###

  # The most common brute-force login attack is a brute-force password
  # attack where an attacker simply tries a large number of emails and
  # passwords to see if any credentials match.
  #
  # Another common method of attack is to use a swarm of computers with
  # different IPs to try brute-forcing a password for a specific account.

  # Throttle POST requests to /users/sign_in by IP address
  #
  # Key: "rack::attack:#{Time.now.to_i/:period}:logins/ip:#{req.ip}"
  throttle('logins/ip', limit: 5, period: 20.seconds) do |req|
    if req.path == '/users/sign_in' && req.post?
      req.get_header("action_dispatch.remote_ip")
    end
  end

  # Throttle POST requests to /users/sign_in by email param
  #
  # Key: "rack::attack:#{Time.now.to_i/:period}:logins/email:#{normalized_email}"
  #
  # Note: This creates a problem where a malicious user could intentionally
  # throttle logins for another user and force their login requests to be
  # denied, but that's not very common and shouldn't happen to you. (Knock
  # on wood!)
  throttle('logins/email', limit: 5, period: 20.seconds) do |req|
    if req.path == '/users/sign_in' && req.post?
      # Normalize the email, using the same logic as your authentication process, to
      # protect against rate limit bypasses. Return the normalized email if present, nil otherwise.
      req.params['email'].to_s.downcase.gsub(/\s+/, "").presence
    end
  end

  # Throttle POST requests to /tenants by IP address
  throttle('tenant_signups/ip', limit: 5, period: 20.seconds) do |req|
    if req.path == '/tenants' && req.post?
      req.get_header("action_dispatch.remote_ip")
    end
  end

  # Throttle POST requests to /posts by IP address using anti-spam measures
  throttle('posts/ip', limit: 1, period: 1.hour) do |req|
    if req.path == '/posts' && req.post?
      ip = req.get_header("action_dispatch.remote_ip")
      real_req = ActionDispatch::Request.new(req.env) # Needed to parse JSON body
  
      # Check for honeypot field submission
      honeypot_filled = real_req.params['post']['dnf1'] != "" || real_req.params['post']['dnf2'] != ""

      # Check for time of form render
      too_fast_submit = Time.now.to_i - real_req.params[:post][:form_rendered_at] < 2
  
      if honeypot_filled || too_fast_submit
        Rack::Attack.cache.store.write("post-submit-antispam-#{ip}", true, expires_in: 1.hour)
      end
  
      # Block if this IP was previously flagged
      if Rack::Attack.cache.store.read("post-submit-antispam-#{ip}")
        ip
      end
    end
  end

  ### Custom Throttle Response ###

  # By default, Rack::Attack returns an HTTP 429 for throttled responses,
  # which is just fine.
  #
  # If you want to return 503 so that the attacker might be fooled into
  # believing that they've successfully broken your app (or you just want to
  # customize the response), then uncomment these lines.
  # self.throttled_response = lambda do |env|
  #  [ 503,  # status
  #    {},   # headers
  #    ['']] # body
  # end
end