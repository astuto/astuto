require 'stripe'

class CreateStripeCustomer
  def run
    tenant = Current.tenant_or_raise! # check that Current Tenant is set
    owner = User.find_by(role: 'owner')

    customer = Stripe::Customer.create({
      email: owner.email,
      name: owner.full_name,
    })
    tb = TenantBilling.first_or_create
    tb.update!(customer_id: customer.id)
  end
end