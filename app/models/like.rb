class Like < ApplicationRecord
  include TenantOwnable
  
  belongs_to :user
  belongs_to :post

  after_create :run_webhooks

  validates :user_id, uniqueness: { scope: :post_id }

  private

    def run_webhooks
      entities = {
        vote_author: self.user.id,
        post: self.post.id,
        board: self.post.board.id
      }
      entities[:post_author] = self.post.user.id if self.post.user_id

      Webhook.where(trigger: :new_vote, is_enabled: true).each do |webhook|        
        RunWebhook.perform_later(
          webhook_id: webhook.id,
          current_tenant_id: Current.tenant.id,
          entities: entities
        )
      end
    end
end
