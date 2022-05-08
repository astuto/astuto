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

  it 'is Orderable' do
    # I didn't used FactoryBot because it didn't apply
    # the custom logic to the 'order' column

    board1 = Board.create(name: 'b1', order: 0)
    board2 = Board.create(name: 'b2')
    board3 = Board.new
    
    expect(board2.order).to eq(1)
    expect(board3.order).to eq(2)

    board1.destroy

    expect(board2.reload.order).to eq(0)
  end
end
