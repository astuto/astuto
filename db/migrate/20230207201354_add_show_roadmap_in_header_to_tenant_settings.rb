class AddShowRoadmapInHeaderToTenantSettings < ActiveRecord::Migration[6.0]
  def change
    add_column :tenant_settings, :show_roadmap_in_header, :boolean, null: false, default: true
  end
end
