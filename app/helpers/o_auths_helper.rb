module OAuthsHelper
  class HashPathNotFound < StandardError; end

  def query_path_from_hash(hash, path)
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
    raise HashPathNotFound, "Json path #{path} not found" if hash == nil

    hash
  end
end