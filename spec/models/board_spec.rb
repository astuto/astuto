require 'rails_helper'

RSpec.describe Board, type: :model do
  
  let(:board) { FactoryBot.create(:board) }
  let(:noname_board) { FactoryBot.build(:noname_board) }

  it 'has a non-nil name' do
    expect(noname_board.valid?).to be_falsy
  end

  it 'has an unique name' do
    board
    board2 = Board.new(name: board.name, description: "This board has the same name as board!")

    expect(board2.valid?).to be_falsy
  end

  it 'has a description that can be nil or empty' do
    nildescription_board = Board.new(name: "nil board", description: nil)
    emptydescription_board = Board.new(name: "empty board", description: "")

    expect(nildescription_board.valid?).to be_truthy
    expect(emptydescription_board.valid?).to be_truthy
  end

end
