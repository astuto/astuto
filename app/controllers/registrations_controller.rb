class RegistrationsController < Devise::RegistrationsController
  # Needed to have Current.tenant available in Devise's controllers
  prepend_before_action :load_tenant_data
  before_action :load_oauths, only: [:new]
  before_action :set_page_title_new, only: [:new]
  before_action :set_page_title_edit, only: [:edit]

  # Override destroy to soft delete
  def destroy
    resource.status = "deleted"
    resource.email = ''
    resource.full_name = t('defaults.deleted_user_full_name')
    resource.save
    Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    set_flash_message :notice, :destroyed
    yield resource if block_given?
    respond_with_navigational(resource){ redirect_to after_sign_out_path_for(resource_name) }
  end

  private

    def set_page_title_new
      @page_title = t('common.forms.auth.sign_up')
    end

    def set_page_title_edit
      @page_title = t('common.forms.auth.profile_settings')
    end
end