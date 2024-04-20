// Status
export const TENANT_BILLING_STATUS_TRIAL = 'trial';
export const TENANT_BILLING_STATUS_ACTIVE = 'active';
export const TENANT_BILLING_STATUS_CANCELED = 'canceled';
export const TENANT_BILLING_STATUS_PERPETUAL = 'perpetual';

export type TenantBillingStatus =
  typeof TENANT_BILLING_STATUS_TRIAL |
  typeof TENANT_BILLING_STATUS_ACTIVE |
  typeof TENANT_BILLING_STATUS_CANCELED |
  typeof TENANT_BILLING_STATUS_PERPETUAL;

interface ITenantBilling {
  trial_ends_at: string;
  subscription_ends_at: string;
  status: TenantBillingStatus;
}

export default ITenantBilling;