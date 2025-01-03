module CustomLiquidFilters
  require 'json'

  def escape_json(input)
    input.to_json[1...-1] # Converts to JSON string and removes surrounding quotes
  end
end