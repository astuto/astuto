require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  describe "notify_comment" do
    let(:user) { FactoryBot.create(:user, email: "notified@example.com", notifications_enabled: true) }
    let(:post) { FactoryBot.create(:post, user: user)}
    let(:comment) { FactoryBot.create(:comment, post: post) }
    let(:mail) { UserMailer.notify_post_owner(comment: comment) }

    it "renders the headers" do
      expect(mail.subject).to eq("[#{ENV.fetch('APP_NAME')}] - New comment on #{post.title}")
      expect(mail.to).to eq(["notified@example.com"])
      expect(mail.from).to eq(["notifications@example.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to include("Hello, #{user.full_name}")
      expect(mail.body.encoded).to include("There is a new comment by")
      expect(mail.body.encoded).to include('Annoyed ? You can <a href="http://localhost:3000/users/edit">turn off notifications here</a>')
    end
  end
end
