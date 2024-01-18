class AddOauthTokenToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :oauth_token, :string, null: true
  end
end
