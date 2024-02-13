class SendNotificationForCommentWorkflow
  attr_accessor :comment

  def initialize(comment: "")
    @comment = comment
  end

  def run
    if comment.is_post_update # Post update
      UserMailer.notify_followers_of_post_update(comment: comment).deliver_later
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