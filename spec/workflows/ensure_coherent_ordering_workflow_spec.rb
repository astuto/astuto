require 'rails_helper'

RSpec.describe EnsureCoherentOrderingWorkflow do
  let(:workflow_creator) {
    EnsureCoherentOrderingWorkflow.new(
      entity_classname: PostStatus,
      column_name: 'order'
    )
  }

  it 'fills any gap in a column representing ordering' do
    post_status1 = FactoryBot.create(:post_status, order: 4)
    post_status2 = FactoryBot.create(:post_status, order: 10)
    post_status3 = FactoryBot.create(:post_status, order: 133)

    workflow_creator.run

    expect(post_status1.reload.order).to eq(0)
    expect(post_status2.reload.order).to eq(1)
    expect(post_status3.reload.order).to eq(2)

    post_status2.destroy
    workflow_creator.run

    expect(post_status1.reload.order).to eq(0)
    expect(post_status3.reload.order).to eq(1)

    post_status1.destroy
    workflow_creator.run

    expect(post_status3.reload.order).to eq(0)
  end
end