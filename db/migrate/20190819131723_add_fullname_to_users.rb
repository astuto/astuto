class AddFullnameToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :full_name, :string
  end
end
