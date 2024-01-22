class RemoveNotNullConstraintToOAuthsTenant < ActiveRecord::Migration[6.1]
  def change
    change_column_null :o_auths, :tenant_id, true
  end
end
