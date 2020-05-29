class AddColumnsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :uid, :string
    add_column :users, :provider, :string
  end
end
