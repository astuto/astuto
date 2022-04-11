class ReorderWorkflow
  attr_accessor :entity_classname, :column_name
  attr_accessor :entity_id, :src_index, :dst_index


  # This workflow is used by entities which has a "order" column of sort
  # Given:
  #   entity_classname: the entity class name, e.g. PostStatus
  #   column_name: the name of the db column that contains the order information, e.g. 'order'
  #   entity_id: the id of the entity being reordered
  #   src_index: the current order of the entity
  #   dst_index = the new order of the entity
  #
  # The workflow reorders the record with id <entity_id> of entity <entity_classname>
  # from <src_index> to <dst_index> using <column_name> as the db column that keeps the ordering
  #
  # Returns:
  #   A collection of the reordered records, if successful
  #   nil, if unsuccessful

  def initialize(entity_classname: "", column_name: "", entity_id: "", src_index: "", dst_index: "")
    @entity_classname = entity_classname
    @column_name = column_name
    @entity_id = entity_id
    @src_index = src_index
    @dst_index = dst_index
  end

  def run
    convert_indexes_to_i
    
    if src_index == dst_index
      return nil
    end

    lowest_index = src_index < dst_index ? src_index : dst_index
    highest_index = src_index < dst_index ? dst_index : src_index
    column_name_sanitized = ActiveRecord::Base.connection.quote_column_name(column_name)

    entity_records = entity_classname.where("#{column_name_sanitized} BETWEEN #{lowest_index} AND #{highest_index}")

    # reorder records
    entity_records.each do |entity_record|
      if entity_record.id == entity_id
        entity_record[column_name] = dst_index
      elsif src_index < dst_index
        entity_record[column_name] -= 1
      elsif src_index > dst_index
        entity_record[column_name] += 1
      end
    end

    # save all changes in a single transaction
    entity_classname.transaction do
      begin
        entity_records.each(&:save!)

        return entity_records
      rescue
        return nil
      end
    end
  end

  def convert_indexes_to_i
    self.src_index = src_index.to_i
    self.dst_index = dst_index.to_i
  end
end