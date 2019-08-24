# Create an admin user and confirm its email automatically
admin = User.create(email: "admin@example.com", password: "password", role: "admin", full_name: "Admin")
admin.confirm

# Create a board
board = Board.create(name: "Feature Requests")

# Create some post statuses
planned_post_status = PostStatus.create(name: "Planned", color: "#0096ff")
in_progress_post_status = PostStatus.create(name: "In Progress", color: "#9437ff")
completed_post_status = PostStatus.create(name: "Completed", color: "#6ac47c")
rejected_post_status = PostStatus.create(name: "Rejected", color: "#ff2600")

puts "A default admin user has been created. Credentials:"
puts "-> email: #{admin.email}"
puts "-> password: #{admin.password}"