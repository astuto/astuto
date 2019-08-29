module Admin
  class UsersController < Admin::ApplicationController
    # Overwrite any of the RESTful controller actions to implement custom behavior
    # For example, you may want to send an email after a foo is updated.
    #
    # def update
    #   foo = Foo.find(params[:id])
    #   foo.update(params[:foo])
    #   send_foo_updated_email
    # end

    # Override this method to specify custom lookup behavior.
    # This will be used to set the resource for the `show`, `edit`, and `update`
    # actions.
    #
    # def find_resource(param)
    #   Foo.find_by!(slug: param)
    # end

    # Override this if you have certain roles that require a subset
    # this will be used to set the records shown on the `index` action.
    #
    # def scoped_resource
    #  if current_user.super_admin?
    #    resource_class
    #  else
    #    resource_class.with_less_stuff
    #  end
    # end

    # See https://administrate-prototype.herokuapp.com/customizing_controller_actions
    # for more information

    def authenticate_admin
      unless user_signed_in?
        flash[:alert] = 'You must be logged in to access this page.'
        redirect_to new_user_session_path
        return
      end

      unless current_user.admin?
        flash[:alert] = 'You do not have the privilegies to access this page.'
        redirect_to root_path
        return
      end
    end

    # overwrite default create
    def create
      user = User.new(user_params)
      user.skip_confirmation! # automatically confirm user email

      if user.save
        flash[:notice] = translate_with_resource('create.success')
        redirect_to admin_user_path(user)
      else
        render :new, locals: {
          page: Administrate::Page::Form.new(dashboard, user),
        }
      end
    end

    # overwrite default update
    def update
      user = User.find(params[:id])
      
      if params[:user][:password].empty?
        user.assign_attributes(user_params.except(:password))
      else
        user.assign_attributes(user_params)
      end
      
      user.skip_reconfirmation! # automatically reconfirm user email
      
      if user.save
        flash[:notice] = translate_with_resource('update.success')
        redirect_to admin_user_path(user)
      else
        render :new, locals: {
          page: Administrate::Page::Form.new(dashboard, user),
        }
      end
    end

    private

      def user_params
        params.require(:user).permit(:full_name, :email, :role, :password)
      end
  end
end
