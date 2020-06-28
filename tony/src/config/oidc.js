const host = window.location.protocol + "//" 
+ window.location.hostname 
+ (window.location.port ? ':' + window.location.port : '');
const { REACT_APP_CLIENT_ID, REACT_APP_AUTHORITY } = process.env;

const config = {
  authority: REACT_APP_AUTHORITY,
  client_id: REACT_APP_CLIENT_ID,
  redirect_uri: `${host}/auth/callback`,
  response_type: "id_token token",
  scope: "openid profile",
  silent_redirect_uri: `${host}/silent`,
  automaticSilentRenew: true,
  post_logout_redirect_uri: `${host}/auth/logout`
};

console.log('OIDC config', config);

export default config;
