import Amplify from 'aws-amplify'

Amplify.configure({
  Auth: {
    userPoolId: 'ap-southeast-1_v3DdwbiHK',

    userPoolWebClientId: '3j37cro6bs5jd52o2i9rpiihh6',

    // REQUIRED - Amazon Cognito Region
    region: 'ap-southeast-1',

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
})

export {
  Amplify,
}
