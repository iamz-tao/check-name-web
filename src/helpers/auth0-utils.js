import auth0 from 'auth0-js'

const getAuth0 = () => new auth0.WebAuth({
  domain: 'spotsme.au.auth0.com',
  clientID: '2_vesoM_S4Krz_XeuA7cVDDaTPnZ_TcG',
  redirectUri: 'http://localhost:3000/auth/signed-in',
  responseType: 'token id_token',
  scope: 'openid profile email',
})

const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`

export const authorize = () => getAuth0()
  .authorize()
export const logout = () => getAuth0()
  .logout({ returnTo: getBaseUrl() })
export const parseHash = callback => getAuth0()
  .parseHash(callback)
