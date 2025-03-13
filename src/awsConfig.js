const awsConfig = {
  Auth: {
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_CLIENT_ID,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
};

export default awsConfig;
