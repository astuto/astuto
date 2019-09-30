require 'rails_helper'

RSpec.describe Comment, type: :model do
  let(:comment) { FactoryBot.build(:comment) }

  it 'should be valid' do
    expect(comment).to be_valid
  end

  it 'has a body' do
    nil_body = FactoryBot.build(:comment, body: nil)
    empty_body = FactoryBot.build(:comment, body: '')

    expect(nil_body).to be_invalid
    expect(empty_body).to be_invalid
  end

  it 'can have no parent' do
    no_parent = FactoryBot.build(:comment, parent: nil)

    expect(no_parent).to be_valid
    expect(no_parent.parent).to be_nil
  end

  it 'can have a parent' do
    parent = FactoryBot.build(:comment)
    child = FactoryBot.build(:comment, parent: parent)

    expect(child).to be_valid
    expect(child.parent).to eq(parent)
  end

  it 'can have no children' do
    expect(comment.children).to be_empty
  end

  it 'can have 1+ children' do
    parent = FactoryBot.create(:comment)
    child1 = FactoryBot.create(:comment, parent: parent)
    child2 = FactoryBot.create(:comment, parent: parent)

    expect(parent.children.length).to eq(2)
  end
end
