require 'rails_helper'

RSpec.describe TenantSetting, type: :model do
  let(:tenant_setting) { FactoryBot.build(:tenant_setting) }

  it 'should be valid' do
    expect(tenant_setting).to be_valid
  end

  it 'has a setting brand_display' do
    expect(tenant_setting.brand_display).to eq('name_and_logo')

    tenant_setting.brand_display = 'name_only'
    expect(tenant_setting).to be_valid

    tenant_setting.brand_display = 'logo_only'
    expect(tenant_setting).to be_valid

    tenant_setting.brand_display = 'no_name_no_logo'
    expect(tenant_setting).to be_valid
  end

  it 'has a setting to show vote count' do
    expect(tenant_setting.show_vote_count).to be_truthy
  end

  it 'has a setting to show vote button in board view' do
    expect(tenant_setting.show_vote_button_in_board).to be_truthy
  end

  it 'has a setting to show powered by astuto' do
    expect(tenant_setting.show_powered_by).to be_truthy
  end

  it 'has a setting that contains the board id of the root page' do
    expect(tenant_setting.root_board_id).to eq(0)
  end

  it 'has a setting to show/hide roadmap link in header' do
    expect(tenant_setting.show_roadmap_in_header).to be_truthy
  end

  it 'has a setting to collapse boards in header' do
    expect(tenant_setting.collapse_boards_in_header).to eq('no_collapse')

    tenant_setting.collapse_boards_in_header = 'always_collapse'
    expect(tenant_setting).to be_valid
  end

  it 'has a setting to allow anonymous feedback' do
    expect(tenant_setting.allow_anonymous_feedback).to be_truthy
  end

  it 'has a setting to require approval for feedback' do
    expect(tenant_setting.feedback_approval_policy).to eq('anonymous_require_approval')

    tenant_setting.feedback_approval_policy = 'never_require_approval'
    expect(tenant_setting).to be_valid

    tenant_setting.feedback_approval_policy = 'always_require_approval'
    expect(tenant_setting).to be_valid
  end
end
