require "administrate/field/base"

class RoleField < Administrate::Field::Base
  def to_s
    data.to_s
  end

  def select_field_values(form_builder)
    form_builder.object.class.public_send(attribute.to_s.pluralize).keys.map do |v|
      [v.titleize, v]
    end
  end
end
