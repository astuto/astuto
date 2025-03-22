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
      name: 'Запланировано',
      color: '#116bb2',
      order: 0,
      show_in_roadmap: true
    )
    in_progress_post_status = PostStatus.create!(
      name: 'Выполняется',
      color: '#685a94',
      order: 1,
      show_in_roadmap: true
    )
    completed_post_status = PostStatus.create!(
      name: 'Завершено',
      color: '#49b04d',
      order: 2,
      show_in_roadmap: true
    )
    rejected_post_status = PostStatus.create!(
      name: 'Отклонено',
      color: '#fd9e36',
      order: 3,
      show_in_roadmap: false
    )

    # Create some Posts
    post1 = Post.create!(
      title: 'Это пример поста с отзывом. Нажмите, чтобы узнать больше!',
      description: 'Пользователи могут отправлять отзывы, публикуя посты, подобные этому. Вы можете назначить **статус** каждому посту: этот, например, отмечен как «Запланировано». Помните, что вы можете настраивать статусы постов в разделе Настройки сайта > Статусы',
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
      title: 'Есть несколько досок',
      description: 'Мы создали для вас две доски: «Запросы функций» и «Отчеты об ошибках», но вы можете добавлять или удалять столько, сколько захотите! Просто перейдите в Настройки сайта > Доски!',
      board_id: bug_board.id,
      user_id: owner.id
    )

    # Create some comments
    post1.comments.create!(
      body: 'Пользователи могут комментировать, чтобы выразить свое мнение! Как и в случае с сообщениями и описаниями досок, комментарии могут быть *Markdown* **отформатированы**',
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