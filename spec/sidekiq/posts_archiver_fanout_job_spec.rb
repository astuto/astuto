require 'rails_helper'

RSpec.describe PostsArchiverFanoutJob, type: :job do
  describe "#perform" do
    let(:post_setting) { FactoryBot.create(:post_setting, archive_after: 3600) }
    let!(:post_status) { FactoryBot.create(:post_status, name: "Rejected") }
    let!(:stale_posts) { FactoryBot.create_list(:post, 2, post_settings_id: post_setting.id, updated_at: DateTime.now - 2.years) }
    let!(:fresh_posts) { FactoryBot.create_list(:post, 2, post_settings_id: post_setting.id) }

    it "enqueues jobs with stale posts only" do
      expect(PostsArchiverExecutorJob).to receive(:perform_async) do |tenant_id, post_id, post_status_id|
        expect(tenant_id).to eq(Current.tenant.id)
        expect(post_id.in?(stale_posts.map(&:id))).to eq(true)
        expect(post_status_id).to eq(post_status.id)
      end.twice
      described_class.new.perform
    end
  end
end
