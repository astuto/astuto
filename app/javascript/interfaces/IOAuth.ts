interface IOAuth {
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

export default IOAuth;