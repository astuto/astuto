class CreateWelcomeEntitiesWorkflow
  def run
    tenant = Current.tenant_or_raise! # check that Current Tenant is set
    owner = tenant.users.first

    # Create some Boards
    feature_board = Board.create!(
      name: 'Feature Requests',
      description: 'This is a **board**! Go to Site settings > Boards to customise it or add more!',
      order: 0
    )
    bug_board = Board.create!(
      name: 'Bug Reports',
      description: 'Tell us everything about problems you encountered in our services!',
      order: 1
    )

    # Create some Post Statuses
    planned_post_status = PostStatus.create!(
      name: 'Planned',
      color: '#0096ff',
      order: 0,
      show_in_roadmap: true
    )
    in_progress_post_status = PostStatus.create!(
      name: 'In Progress',
      color: '#9437ff',
      order: 1,
      show_in_roadmap: true
    )
    completed_post_status = PostStatus.create!(
      name: 'Completed',
      color: '#6ac47c',
      order: 2,
      show_in_roadmap: true
    )
    rejected_post_status = PostStatus.create!(
      name: 'Rejected',
      color: '#ff2600',
      order: 3,
      show_in_roadmap: false
    )

    # Create some Posts
    post1 = Post.create!(
      title: 'This is an example feedback post, click to learn more!',
      description: 'Users can submit feedback by publishing posts like this. You can assign a **status** to each post: this one, for example, is marked as "Planned". Remember that you can customise post statuses from Site settings > Statuses',
      board_id: feature_board.id,
      user_id: owner.id,
      post_status_id: planned_post_status.id
    )
    PostStatusChange.create!(
      post_id: post1.id,
      user_id: owner.id,
      post_status_id: planned_post_status.id
    )

    post2 = Post.create!(
      title: 'There are multiple boards',
      description: 'We created two boards for you, "Feature Requests" and "Bug Reports", but you can add or remove as many as you want! Just head to Site settings > Boards!',
      board_id: bug_board.id,
      user_id: owner.id
    )

    # Create some comments
    post1.comments.create!(
      body: 'Users can comment to express their opinions! As with posts and board descriptions, comments can be *Markdown* **formatted**',
      user_id: owner.id
    )

    # Set first board as root page
    TenantSetting.create!(root_board_id: feature_board.id)

    # Enable all default oauths
    OAuth.include_only_defaults.each do |o_auth|
      TenantDefaultOAuth.create!(o_auth_id: o_auth.id)
    end
  end
end