require 'rake'

def get_tenants_to_notify(period)
  days_before_expiration = period == "mid" ? 4.days : -1.day
  date_to_check = Date.current + days_before_expiration

  tbs = TenantBilling.unscoped.where(
    trial_ends_at: date_to_check.beginning_of_day..date_to_check.end_of_day,
    status: 'trial'
  )
  Tenant.where(id: tbs.map(&:tenant_id))
end

task notify_tenants_trial_period: [:environment] do
  begin
    # Notify tenants mid trial
    tenants_mid_trial = get_tenants_to_notify("mid")
    puts "There are #{tenants_mid_trial.length} tenants to notify for mid trial."

    tenants_mid_trial.each do |tenant|
      puts "Delivering trial_mid email for #{tenant.site_name}..."
      TenantMailer.trial_mid(tenant: tenant).deliver_later
    end

    # Notify tenants end of trial
    tenants_end_trial = get_tenants_to_notify("end")
    puts "There are #{tenants_end_trial.length} tenants to notify for end trial."

    tenants_end_trial.each do |tenant|
      puts "Delivering trial_end email for #{tenant.site_name}..."
      TenantMailer.trial_end(tenant: tenant).deliver_later
    end
  rescue Exception => e
    error_subject = "Scheduled Task 'notify_tenants_trial_period.rake' Failed"

    res = ActionMailer::Base.mail(
      from: "errors@astuto.io",
      to: "info@astuto.io",
      subject: error_subject,
      body: "#{e.message}\n\n#{e.backtrace.join("\n")}",
    ).deliver_now

    raise error_subject # raise error so rake task returns non-zero code
  end
end