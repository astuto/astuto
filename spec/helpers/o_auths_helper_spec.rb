require 'rails_helper'

RSpec.describe OAuthsHelper, type: :helper do
  context 'query_path_from_hash method' do
    it 'queries a path from hash' do
      email = "admin@example.com"
      name = "Admin"
      surname = "Example"
      hash = {
        "email" => email,
        "info" => {
          "name" => name,
          "additional_info" => {
            "surnames" => [
              ["surname" => "Surname1"],
              ["surname" => "Surname2"],
              ["surname" => surname]
            ]
          }
        }
      }
      email_path = "email"
      name_path = "info.name"
      surname_path = "info.additional_info.surnames[2][0].surname"

      expect(helper.query_path_from_hash(hash, name_path)).to eq(name)
      expect(helper.query_path_from_hash(hash, email_path)).to eq(email)
      expect(helper.query_path_from_hash(hash, surname_path)).to eq(surname)
    end

    it 'returns nil if inputs are not of type Hash and String respectively' do
      expect(helper.query_path_from_hash({"valid" => true}, ["invalid"])).to eq(nil)
      expect(helper.query_path_from_hash("invalid", "valid")).to eq(nil)
    end

    it 'returns nil if path not found' do
      email = "admin@example.com"
      name = "Admin"
      hash = {
        "email" => email,
        "info" => {
          "name" => name,
        }
      }
      
      name_path = "name"
      expect(helper.query_path_from_hash(hash, name_path)).to eq(nil)

      name_path = "info.names[0]"
      expect(helper.query_path_from_hash(hash, name_path)).to eq(nil)
    end
  end
end