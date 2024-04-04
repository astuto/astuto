class AddSlugToOAuth < ActiveRecord::Migration[6.1]
  def change
    add_column :o_auths, :slug, :string

    add_index :o_auths, [:slug, :tenant_id], unique: true
  end
end
