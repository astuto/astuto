class EnsureCoherentOrderingWorkflow
  attr_accessor :entity_classname, :column_name

  def initialize(entity_classname: "", column_name: "")
    @entity_classname = entity_classname
    @column_name = column_name
  end

  def run
    column_name_sanitized = ActiveRecord::Base.connection.quote_column_name(column_name)

    entity_records = entity_classname.order("#{column_name_sanitized} ASC")

    entity_records.each_with_index do |entity_record, order|
      entity_record[column_name] = order
    end

    entity_classname.transaction do
      entity_records.each(&:save!)
    end
  end
end