require 'rails_helper'

RSpec.describe PostsArchiverExecutorJob, type: :job do
  describe "#perform" do
    let(:post_setting) { FactoryBot.create(:post_setting, archive_after: 3600) }
    let!(:post_status) { FactoryBot.create(:post_status, name: "Rejected") }
    
    context "when post is stale" do
      let!(:post) { FactoryBot.create(:post, post_settings_id: post_setting.id, updated_at: DateTime.now - 2.years) }

      context "when post status is present" do
        it "archives post" do
          expect { described_class.new.perform(Current.tenant.id, post.id, post_status.id) }.to change { post.reload.post_status_id }.to(post_status.id)
        end
      end

      context "when post status is not present" do
        let!(:post_status) { nil }

        it "not archives post" do
          expect { described_class.new.perform(Current.tenant.id, post.id, 0) }.to not_change { post.reload.post_status_id }
        end
      end
    end

    context "when post is not stale" do
      let!(:post) { FactoryBot.create(:post, post_settings_id: post_setting.id, updated_at: DateTime.now - 2.seconds) }

      it "not archives post" do
        expect { described_class.new.perform(Current.tenant.id, post.id, post_status.id) }.to not_change { post.reload.post_status_id }
      end
    end
  end
end
