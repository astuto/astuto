interface IOAuthJSON {
  name: string;
  logo?: string;
  is_enabled: boolean;
  client_id: string;
  client_secret: string;
  authorize_url: string;
  token_url: string;
  profile_url: string;
  scope: string;
  json_user_email_path: string;
  json_user_name_path?: string;
}

export default IOAuthJSON;