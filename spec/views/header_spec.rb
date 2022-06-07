require 'rails_helper'

RSpec.describe 'header', type: :view do
  let(:board1) { FactoryBot.create(:board) }
  let(:board2) { FactoryBot.create(:board) }

  def render_header
    render partial: 'layouts/header'
  end

  it 'renders a logo' do
    render_header

    expect(rendered).to have_selector('.brand')
  end

  it 'renders a link for each board' do
    @boards = [board1, board2]

    render_header

    expect(rendered).to have_content(board1.name)
    expect(rendered).to have_content(board2.name)
  end

  it 'applies "active" class to the active board link' do
    @boards = [board1, board2]
    @board = board1 # active board is board1

    render_header

    expect(rendered).to have_selector('.active', count: 1)
  end
end