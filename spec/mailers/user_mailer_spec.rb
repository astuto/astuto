require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  describe "notify_comment" do
    let(:user) { FactoryBot.create(:user, email: "notified@example.com", notifications_enabled: true) }
    let(:post) { FactoryBot.create(:post, user: user)}
    let(:comment) { FactoryBot.create(:comment, post: post) }
    let(:mail) { UserMailer.notify_post_owner(comment: comment) }

    it "renders the headers" do
      expect(mail.subject).to eq("[#{ENV.fetch('APP_NAME')}] New comment on #{post.title}")
      expect(mail.to).to eq(["notified@example.com"])
      expect(mail.from).to eq(["notifications@example.com"])
    end

    it "renders the user name, post title, replier name and comment body" do
      expect(mail.body.encoded).to include(user.full_name)
      expect(mail.body.encoded).to include(post.title)
      expect(mail.body.encoded).to include(comment.user.full_name)
      expect(mail.body.encoded).to include(comment.body)
    end
  end
end
