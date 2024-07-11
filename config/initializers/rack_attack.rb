class Rack::Attack
  ### Throttle Spammy Clients ###

  # If any single client IP is making tons of requests, then they're
  # probably malicious or a poorly-configured scraper. Either way, they
  # don't deserve to hog all of the app server's CPU. Cut them off!
  #
  # Note: If you're serving assets through rack, those requests may be
  # counted by rack-attack and this throttle may be activated too
  # quickly. If so, enable the condition to exclude them from tracking.

  # Throttle all requests by IP (60rpm)
  #
  # Key: "rack::attack:#{Time.now.to_i/:period}:req/ip:#{req.ip}"
  throttle('req/ip', limit: 300, period: 5.minutes) do |req|
    req.get_header("action_dispatch.remote_ip") # unless req.path.start_with?('/assets')
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

  # Throttle POST requests to /posts by IP address when honeypot fields are filled
  throttle('posts/ip_honeypot', limit: 1, period: 30.minutes) do |req|
    if req.path == '/posts' && req.post?
      ip = req.get_header("action_dispatch.remote_ip")
      real_req = ActionDispatch::Request.new(req.env) # Needed to parse JSON body
  
      # Check for honeypot field submission
      honeypot_filled = real_req.params['post']['dnf1'] != "" || real_req.params['post']['dnf2'] != ""
  
      # If honeypot fields are filled, flag this IP in the cache
      if honeypot_filled
        Rack::Attack.cache.store.write("honeypot-#{ip}", true, expires_in: 30.minutes)
      end
  
      # Block if this IP was previously flagged for honeypot submission
      if Rack::Attack.cache.store.read("honeypot-#{ip}")
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