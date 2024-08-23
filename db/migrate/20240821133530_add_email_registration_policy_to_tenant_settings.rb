class AddEmailRegistrationPolicyToTenantSettings < ActiveRecord::Migration[6.1]
  def change
    add_column :tenant_settings, :email_registration_policy, :integer, default: 0, null: false
    add_column :tenant_settings, :allowed_email_domains, :string
  end
end
