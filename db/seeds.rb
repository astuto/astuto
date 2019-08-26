# Create an admin user and confirm its email automatically
admin = User.create(email: 'admin@example.com', password: 'password', role: 'admin', full_name: 'Admin')
admin.confirm

# Create some boards
feature_board = Board.create(name: 'Feature Requests', description: 'Post here your feature requests.')
bug_board = Board.create(name: 'Bug Reports', description: 'Post here your bug reports.')

# Create some post statuses
planned_post_status = PostStatus.create(name: 'Planned', color: '#0096ff', order: 1, show_in_roadmap: true)
in_progress_post_status = PostStatus.create(name: 'In Progress', color: '#9437ff', order: 2, show_in_roadmap: true)
completed_post_status = PostStatus.create(name: 'Completed', color: '#6ac47c', order: 3, show_in_roadmap: true)
rejected_post_status = PostStatus.create(name: 'Rejected', color: '#ff2600', order: 4, show_in_roadmap: false)

# Create some posts
Post.create(
  title: 'This is how users give you feedback',
  description: 'They can also provide an extendend description like this... bla bla...',
  board_id: feature_board.id,
  user_id: admin.id
)
Post.create(
  title: 'You can assign a status to each post',
  description: 'This one, for example, is marked as "Planned"',
  board_id: feature_board.id,
  user_id: admin.id,
  post_status_id: planned_post_status.id
)
Post.create(
  title: 'There are multiple boards',
  description: 'For now you have Feature Requests and Bug Reports, but you can add or remove as many as you want!',
  board_id: bug_board.id,
  user_id: admin.id,
  post_status_id: in_progress_post_status.id
)

# Let the user know how to log in with admin account
puts 'A default admin account has been created. Credentials:'
puts "-> email: #{admin.email}"
puts "-> password: #{admin.password}"