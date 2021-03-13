module Subdomain

  def initializer(router)
    @router = router
  end

  def self.matches?(request)
    User.exists? subdomain: request.subdomain
  end

end
