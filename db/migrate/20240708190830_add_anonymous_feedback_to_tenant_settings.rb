class AddAnonymousFeedbackToTenantSettings < ActiveRecord::Migration[6.1]
  def change
    add_column :tenant_settings, :allow_anonymous_feedback, :boolean, default: true, null: false
    add_column :tenant_settings, :feedback_approval_policy, :integer, default: 0, null: false
  end
end
