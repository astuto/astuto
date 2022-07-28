export interface IOAuth {
  id?: number;
  name: string;
  logo?: string;
  isEnabled: boolean;
  clientId: string;
  clientSecret: string;
  authorizeUrl: string;
  tokenUrl: string;
  profileUrl: string;
  scope: string;
  jsonUserEmailPath: string;
  jsonUserNamePath?: string;
}

export interface IOAuthJSON {
  id: string;
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

export const oAuthJSON2JS = (oAuthJSON: IOAuthJSON) => ({
  id: parseInt(oAuthJSON.id),
  name: oAuthJSON.name,
  logo: oAuthJSON.logo,
  isEnabled: oAuthJSON.is_enabled,
  clientId: oAuthJSON.client_id,
  clientSecret: oAuthJSON.client_secret,
  authorizeUrl: oAuthJSON.authorize_url,
  tokenUrl: oAuthJSON.token_url,
  scope: oAuthJSON.scope,
  profileUrl: oAuthJSON.profile_url,
  jsonUserEmailPath: oAuthJSON.json_user_email_path,
  jsonUserNamePath: oAuthJSON.json_user_name_path
});

export const oAuthJS2JSON = (oAuth: IOAuth) => ({
  id: oAuth.id.toString(),
  name: oAuth.name,
  logo: oAuth.logo,
  is_enabled: oAuth.isEnabled,
  client_id: oAuth.clientId,
  client_secret: oAuth.clientSecret,
  authorize_url: oAuth.authorizeUrl,
  token_url: oAuth.tokenUrl,
  profile_url: oAuth.profileUrl,
  scope: oAuth.scope,
  json_user_email_path: oAuth.jsonUserEmailPath,
  json_user_name_path: oAuth.jsonUserNamePath,
});