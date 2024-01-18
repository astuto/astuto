module OAuthsHelper
  # Retrieves a value from a hash/array using a given path.
  # obj [Hash, Array] The object or hash to query.
  # path [String] The path to the desired value, using dot notation for nested keys and square brackets for array indexes.
  # returns [Object, nil] The value at the specified path, or nil if the path is invalid or the value is not found.
  def query_path_from_object(obj, path)
    return nil unless obj.class == Hash or obj.class == Array
    return nil unless path.class == String
    begin
      path_array = path
        .split(Regexp.union([ '.', '[', ']' ]))     # split by . and []
        .filter { |v| not v.blank? }                # remove possible blank values
        .map do |v|                                 # convert indexes to integer
          if v == "0"
            0
          elsif v.to_i == 0
              v
          else
            v.to_i
          end
        end
      
      path_array.each do |selector|
        break if obj == nil

        obj = obj[selector]
      end

      obj
    rescue
      nil
    end
  end
end