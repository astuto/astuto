class AddHasSetPasswordToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :has_set_password, :boolean, default: true, null: false
  end
end
