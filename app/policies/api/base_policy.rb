module Api
  class BasePolicy
    attr_reader :api_key, :record
 
    def initialize(api_key, record)
      @api_key = api_key
      @record = record
    end
  end
end