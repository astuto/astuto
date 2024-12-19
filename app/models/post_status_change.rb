class PostStatusChange < ApplicationRecord
  include TenantOwnable
  
  belongs_to :user
  belongs_to :post
  belongs_to :post_status, optional: true

  after_create :run_webhooks

  private

    def run_webhooks
      entities = {
        post: self.post.id,
        board: self.post.board.id
      }
      entities[:post_author] = self.post.user.id if self.post.user_id
      entities[:post_status] = self.post_status.id if self.post_status_id

      Webhook.where(trigger: :post_status_change, is_enabled: true).each do |webhook|        
        RunWebhook.perform_later(
          webhook_id: webhook.id,
          current_tenant_id: Current.tenant.id,
          entities: entities
        )
      end
    end
end
