import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://dev-v8tw5v7v.us.auth0.com/',
  redirectUri: window.location.origin,
  clientId: 'Xk5r3ZVr4MkMNLVAnDogRP7ZCp8NaysY',
  responseType: 'code',
  scope: 'openid profile email offline_access api',
  showDebugInformation: true,
};