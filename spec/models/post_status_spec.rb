require 'rails_helper'

RSpec.describe PostStatus, type: :model do
  let(:post_status) { FactoryBot.create(:post_status) }

  it 'should be valid' do
    expect(post_status).to be_valid
  end

  it 'must have a name' do
    emptyname = FactoryBot.build(:post_status, name: "")
    nilname = FactoryBot.build(:post_status, name: nil)

    expect(emptyname).to be_invalid
    expect(nilname).to be_invalid
  end

  it 'has a unique name' do
    post_status2 = FactoryBot.build(:post_status, name: post_status.name)
    
    expect(post_status2).to be_invalid
  end

  it 'has a valid hex color' do
    nilcolor = FactoryBot.build(:post_status, color: nil)
    emptycolor = FactoryBot.build(:post_status, color: "")
    invalidcolor = FactoryBot.build(:post_status, color: "ffffff")
    invalidcolor2 = FactoryBot.build(:post_status, color: "#ffff")
    validcolor = FactoryBot.build(:post_status, color: "#fff")
    validcolor2 = FactoryBot.build(:post_status, color: "#ffffff")

    expect(nilcolor).to be_invalid
    expect(emptycolor).to be_invalid
    expect(invalidcolor).to be_invalid
    expect(invalidcolor2).to be_invalid
    expect(validcolor).to be_valid
    expect(validcolor2).to be_valid
  end
end
