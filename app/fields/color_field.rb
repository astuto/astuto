require "administrate/field/base"

class ColorField < Administrate::Field::Base
  def to_s
    data.to_s
  end
end
