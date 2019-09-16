require 'rails_helper'

feature 'board', type: :system, js: true do
  let(:board) { FactoryBot.create(:board) }
  let(:other_board) { FactoryBot.create(:board) }

  let(:post_status1) { FactoryBot.create(:post_status) }
  let(:post_status2) { FactoryBot.create(:post_status) }

  let(:post1) { FactoryBot.create(:post, post_status: post_status1, board: board) }
  let(:post2) { FactoryBot.create(:post, post_status: post_status2, board: board) }
  let(:post3) { FactoryBot.create(:post, board: board) }
  let(:post4) { FactoryBot.create(:post, board: other_board) }

  let(:user) { FactoryBot.create(:user) }

  let(:board_container) { '.boardContainer' }
  let(:post_link) { '.postLink' }
  let(:sidebar) { '.sidebar' }
  let(:new_post_form) { '.newPostForm' }
  let(:reset_filter) { '.resetFilter' }

  before(:each) {
    board
    other_board
    post_status1
    post_status2
    post1
    post2
    post3
    post4
  }

  def assert_number_of_posts_shown(n_of_posts_in_board, n_of_posts_per_page, page_number)
    within board_container do
      if n_of_posts_in_board < n_of_posts_per_page * page_number
        expect(page).to have_selector(post_link, count: n_of_posts_in_board)
      else
        expect(page).to have_selector(post_link, count: n_of_posts_per_page * page_number)
      end
    end
  end

  it 'renders correctly' do
    visit board_path(board)

    expect(page).to have_content(/#{board.name}/i)
    expect(page).to have_selector(board_container, count: 1)
    expect(page).to have_selector(sidebar)
  end

  it 'renders posts of that board' do
    visit board_path(board)

    within board_container do
      expect(page).to have_selector(post_link, count: 3)
      expect(page).to have_content(/#{post1.title}/i)
      expect(page).to have_content(/#{post1.description}/i)
      expect(page).to have_no_content(/#{post4.title}/i)
      expect(page).to have_no_content(/#{post4.description}/i)
    end
  end

  it 'renders all post statuses in the sidebar' do
    visit board_path(board)

    within sidebar do
      expect(page).to have_content(/#{post_status1.name}/i)
      expect(page).to have_content(/#{post_status2.name}/i)
    end
  end

  it 'renders a log in button if not logged in' do
    visit board_path(board)

    within sidebar do
      expect(page).to have_content(/Log in \/ Sign up/i)
      click_link 'Log in / Sign up'
      expect(page).to have_current_path(new_user_session_path)
    end
  end

  it 'renders a submit feedback button that shows a form if logged in' do
    user.confirm
    sign_in user
    visit board_path(board)

    within sidebar do
      expect(page).to have_content(/Submit feedback/i)
      expect(page).to have_no_selector(new_post_form)
      
      click_button 'Submit feedback' # open submit form

      expect(page).to have_selector(new_post_form)
      expect(page).to have_content(/Title/i)
      expect(page).to have_content(/Description/i)
    end
  end

  it 'enables logged in users to submit posts to that board' do
    user.confirm
    sign_in user

    post_title = 'Post created from test suite'
    post_description = 'Yes, thats true'

    visit board_path(board)

    post_count = Post.count

    within sidebar do
      click_button 'Submit feedback' # open submit form

      fill_in 'Title', with: post_title
      fill_in 'Description (optional)', with: post_description
      click_button 'Submit feedback' # submit

      expect(page).to have_selector('.successText')
    end

    visit board_path(board)

    expect(Post.count).to eq(post_count + 1)


    expect(page).to have_content(/#{post_title}/i)
    expect(page).to have_content(/#{post_description}/i)
  end

  it 'enables users to filter posts by post status' do
    visit board_path(board)

    expect(page).to have_content(/#{post1.title}/i)
    expect(page).to have_content(/#{post2.title}/i)
    expect(page).to have_content(/#{post3.title}/i)

    within sidebar do
      selector = ".postStatus#{post_status1.name.gsub(' ', '')}"
      find(selector).click
    end

    expect(page).to have_content(/#{post1.title}/i)
    expect(page).to have_no_content(/#{post2.title}/i)
    expect(page).to have_no_content(/#{post3.title}/i)

    # you can also clear the filter
    within sidebar do
      find(reset_filter).click
    end

    expect(page).to have_content(/#{post1.title}/i)
    expect(page).to have_content(/#{post2.title}/i)
    expect(page).to have_content(/#{post3.title}/i)
  end

  it 'enables users to search posts by title and description' do
    visit board_path(board)

    expect(page).to have_content(/#{post1.title}/i)
    expect(page).to have_content(/#{post2.title}/i)
    expect(page).to have_content(/#{post3.title}/i)

    within sidebar do
      find('#searchPostInput').set post1.title
    end

    expect(page).to have_content(/#{post1.title}/i)
    expect(page).to have_no_content(/#{post2.title}/i)
    expect(page).to have_no_content(/#{post3.title}/i)

    within sidebar do
      find('#searchPostInput').set post2.description
    end

    expect(page).to have_no_content(/#{post1.description}/i)
    expect(page).to have_content(/#{post2.description}/i)
    expect(page).to have_no_content(/#{post3.description}/i)
  end

  it 'autoloads new posts with infinite scroll' do
    40.times { FactoryBot.create(:post, board: board) }
    n_of_posts_in_board = Post.where(board_id: board.id).count

    visit board_path(board)
    
    n_of_posts_per_page = page.all(:css, post_link).size
    page_number = 1

    assert_number_of_posts_shown(n_of_posts_in_board, n_of_posts_per_page, page_number)

    # scroll to the bottom of the page until all posts are shown
    while n_of_posts_in_board > n_of_posts_per_page * page_number
      execute_script('window.scrollTo(0, document.body.scrollHeight);');
      page_number += 1
      assert_number_of_posts_shown(n_of_posts_in_board, n_of_posts_per_page, page_number)
    end
  end
end