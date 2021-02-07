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

  it 'automatically sets order to last order if not specified' do
    order = 10
    board1 = FactoryBot.create(:board, order: order)
    board2 = Board.new
    
    expect(board1.order).to eq(order)
    expect(board2.order).to eq(order + 1)
  end

  describe '.to_param' do
    it 'uses the name as param' do
      board = FactoryBot.build(:board, name: 'Random Board', slug: nil)

      board.update(name: "Example")
      
      expect(board.to_param).to eq('example')
    end

    it 'transforms name using parameterize' do
      board = FactoryBot.build(:board, name: 'Random Board', slug: nil)
      
      board.update(name: "My Funky Name")

      expect(board.to_param).to eq('my-funky-name')
    end
  end
end
