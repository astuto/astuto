class AddSlugToBoards < ActiveRecord::Migration[6.1]
  def change
    add_column :boards, :slug, :string

    add_index :boards, [:slug, :tenant_id], unique: true
  end
end
