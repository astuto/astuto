module OAuthsHelper
  def query_path_from_hash(hash, path)
    return nil unless hash.class == Hash and path.class == String

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
      break if hash == nil

      hash = hash[selector]
    end

    hash
  end
end