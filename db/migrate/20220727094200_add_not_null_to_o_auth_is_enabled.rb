class AddNotNullToOAuthIsEnabled < ActiveRecord::Migration[6.0]
  def change
    change_column_null :o_auths, :is_enabled, false
  end
end
