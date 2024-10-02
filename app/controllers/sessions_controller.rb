class SessionsController < Devise::SessionsController
  # Needed to have Current.tenant available in Devise's controllers
  prepend_before_action :load_tenant_data
  before_action :load_oauths, only: [:new]
  before_action :set_page_title, only: [:new]


  def new
    session[:return_to] = request.referer
    super
  end

  private

    def set_page_title
      @page_title = t('common.forms.auth.log_in')
    end
end
