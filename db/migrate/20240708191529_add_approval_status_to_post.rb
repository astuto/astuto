class AddApprovalStatusToPost < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :approval_status, :integer, default: 0, null: false
  end
end
