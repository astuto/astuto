require 'rails_helper'

RSpec.describe Board, type: :model do
  let(:board) { FactoryBot.create(:board) }

  it 'should be valid' do
    expect(board).to be_valid
  end

  it 'has a non-nil and non-empty name' do
    nil_name_board = FactoryBot.build(:board, name: nil)
    empty_name_board = FactoryBot.build(:board, name: '')

    expect(nil_name_board).to be_invalid
    expect(empty_name_board).to be_invalid
  end

  it 'has an unique name' do
    board
    board2 = FactoryBot.build(:board, name: board.name)

    expect(board2).to be_invalid
  end

  it 'has a description that can be nil or empty' do
    nil_description_board = FactoryBot.build(:board, description: nil)
    empty_description_board = FactoryBot.build(:board, description: '')

    expect(nil_description_board).to be_valid
    expect(empty_description_board).to be_valid
  end
end
