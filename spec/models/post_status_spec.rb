require 'rails_helper'

RSpec.describe PostStatus, type: :model do
  let(:post_status) { FactoryBot.create(:post_status) }

  it 'must have a name' do
    emptyname = FactoryBot.build(:post_status, name: "")
    nilname = FactoryBot.build(:post_status, name: nil)

    expect(emptyname.valid?).to be_falsy
    expect(nilname.valid?).to be_falsy
    expect(post_status.valid?).to be_truthy
  end

  it 'has a unique name' do
    post_status2 = FactoryBot.build(:post_status, name: post_status.name)
    
    expect(post_status2.valid?).to be_falsy
    expect(post_status.valid?).to be_truthy
  end

  it 'has a valid hex color' do
    nilcolor = FactoryBot.build(:post_status, color: nil)
    emptycolor = FactoryBot.build(:post_status, color: "")
    invalidcolor = FactoryBot.build(:post_status, color: "ffffff")
    invalidcolor2 = FactoryBot.build(:post_status, color: "#ffff")
    validcolor = FactoryBot.build(:post_status, color: "#fff")
    validcolor2 = FactoryBot.build(:post_status, color: "#ffffff")

    expect(nilcolor.valid?).to be_falsy
    expect(emptycolor.valid?).to be_falsy
    expect(invalidcolor.valid?).to be_falsy
    expect(invalidcolor2.valid?).to be_falsy
    expect(validcolor.valid?).to be_truthy
    expect(validcolor2.valid?).to be_truthy
  end
end
