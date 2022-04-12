require 'rails_helper'

RSpec.describe ReorderWorkflow do
  let(:workflow_creator) {
    ReorderWorkflow.new(
      entity_classname: entity_classname,
      column_name: column_name,
      entity_id: entity_id,
      src_index: src_index,
      dst_index: dst_index
    )
  }

  let(:entity_classname) { PostStatus }
  let(:column_name) { 'order' }
  let(:entity_id) { post_status1.id }
  let(:src_index) { post_status1.order }
  let(:dst_index) { post_status3.order }

  let!(:post_status0) { FactoryBot.create(:post_status, order: 0) }
  let!(:post_status1) { FactoryBot.create(:post_status, order: 1) }
  let!(:post_status2) { FactoryBot.create(:post_status, order: 2) }
  let!(:post_status3) { FactoryBot.create(:post_status, order: 3) }
  let!(:post_status4) { FactoryBot.create(:post_status, order: 4) }

  it 'reorders entities after moving one of them' do
    workflow_creator.run

    expect(post_status0.reload.order).to eq(0)
    expect(post_status1.reload.order).to eq(3)
    expect(post_status3.reload.order).to eq(2)
    expect(post_status2.reload.order).to eq(1)
    expect(post_status4.reload.order).to eq(4)
  end
end