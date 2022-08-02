class RegistrationsController < Devise::RegistrationsController
  # Needed to have Current.tenant available in Devise's controllers
  prepend_before_action :load_tenant_data
  before_action :load_oauths, only: [:new]

  # Override destroy to soft delete
  def destroy
    resource.status = "deleted"
    resource.save
    Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    set_flash_message :notice, :destroyed
    yield resource if block_given?
    respond_with_navigational(resource){ redirect_to after_sign_out_path_for(resource_name) }
  end
end