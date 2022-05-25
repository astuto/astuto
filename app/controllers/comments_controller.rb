class CommentsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update]

  def index
    comments = Comment
      .select(
        :id,
        :body,
        :parent_id,
        :is_post_update,
        :updated_at,
        'users.full_name as user_full_name',
        'users.email as user_email',
      )
      .where(post_id: params[:post_id])
      .left_outer_joins(:user)
      .order(updated_at: :desc)

    render json: comments
  end

  def create
    comment = Comment.new(comment_params)

    if comment.save
      send_notifications(comment)

      render json: comment.attributes.merge(
        { user_full_name: current_user.full_name, user_email: current_user.email}
      ), status: :created
    else
      render json: {
        error: I18n.t('errors.comment.create', message: comment.errors.full_messages)
      }, status: :unprocessable_entity
    end
  end

  def update
    comment = Comment.find(params[:id])

    comment.assign_attributes(comment_params)

    if !current_user.power_user? && current_user.id != post.user_id
      render json: I18n.t('errors.unauthorized'), status: :unauthorized
      return
    end

    if comment.save
      render json: comment.attributes.merge(
        { user_full_name: current_user.full_name, user_email: current_user.email}
      )
    else
      render json: {
        error: I18n.t('errors.comment.update', message: comment.errors.full_messages)
      }, status: :unprocessable_entity
    end
  end

  private
  def comment_params
    params
      .require(:comment)
      .permit(:body, :parent_id, :is_post_update)
      .merge(
        user_id: current_user.id,
        post_id: params[:post_id]
      )
  end

  def send_notifications(comment)
    if comment.is_post_update # Post update
      UserMailer.notify_followers(comment: comment).deliver_later
      return
    end
    
    if comment.parent_id == nil # Reply to a post
      user = comment.post.user
      
      if comment.user.id != user.id and
         user.notifications_enabled? and
         comment.post.follows.exists?(user_id: user.id)
        
        UserMailer.notify_post_owner(comment: comment).deliver_later
      end
    else # Reply to a comment
      parent_comment = comment.parent
      user = parent_comment.user

      if user.notifications_enabled? and
         parent_comment.user.id != comment.user.id
        
        UserMailer.notify_comment_owner(comment: comment).deliver_later
      end
    end
    
  end
end
