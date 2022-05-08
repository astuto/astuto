require 'rails_helper'

RSpec.describe PostStatus, type: :model do
  let(:post_status) { FactoryBot.create(:post_status) }

  it 'should be valid' do
    expect(post_status).to be_valid
  end

  it 'must have a name' do
    empty_name = FactoryBot.build(:post_status, name: '')
    nil_name = FactoryBot.build(:post_status, name: nil)

    expect(empty_name).to be_invalid
    expect(nil_name).to be_invalid
  end

  it 'has a unique name' do
    post_status2 = FactoryBot.build(:post_status, name: post_status.name)
    
    expect(post_status2).to be_invalid
  end

  it 'has a valid hex color' do
    nil_color = FactoryBot.build(:post_status, color: nil)
    empty_color = FactoryBot.build(:post_status, color: '')
    invalid_color = FactoryBot.build(:post_status, color: 'ffffff')
    invalid_color2 = FactoryBot.build(:post_status, color: '#ffff')
    valid_color = FactoryBot.build(:post_status, color: '#fff')
    valid_color2 = FactoryBot.build(:post_status, color: '#ffffff')

    expect(nil_color).to be_invalid
    expect(empty_color).to be_invalid
    expect(invalid_color).to be_invalid
    expect(invalid_color2).to be_invalid
    expect(valid_color).to be_valid
    expect(valid_color2).to be_valid
  end

  it 'must have a order of type integer and non-negative' do
    nil_order = FactoryBot.build(:post_status, order: nil)
    empty_order = FactoryBot.build(:post_status, order: '')
    decimal_order = FactoryBot.build(:post_status, order: 1.1)
    negative_order = FactoryBot.build(:post_status, order: -1)
    zero_order = FactoryBot.build(:post_status, order: 0)

    expect(nil_order).to be_invalid
    expect(empty_order).to be_invalid
    expect(decimal_order).to be_invalid
    expect(negative_order).to be_invalid
    expect(zero_order).to be_valid
  end

  it 'has a method that returns only post statuses that should show up in roadmap' do
    post_status2 = FactoryBot.create(:post_status, show_in_roadmap: true, order: 2)
    post_status3 = FactoryBot.create(:post_status, show_in_roadmap: true, order: 1)

    roadmap = PostStatus.find_roadmap

    expect(roadmap.size).to eq(2)
    expect(roadmap.first).to eq(post_status3)
    expect(roadmap.second).to eq(post_status2)
  end

  it 'is Orderable' do
    # I didn't used FactoryBot because it didn't apply
    # the custom logic to the 'order' column

    post_status1 = PostStatus.create(name: 'ps1', color: '#000000', order: 0)
    post_status2 = PostStatus.create(name: 'ps2', color: '#000000')
    post_status3 = PostStatus.new
    
    expect(post_status2.order).to eq(1)
    expect(post_status3.order).to eq(2)

    post_status1.destroy

    expect(post_status2.reload.order).to eq(0)
  end
end
