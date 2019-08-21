require "administrate/field/base"

class IdField < Administrate::Field::Base
  def to_s
    data.to_s
  end
end
