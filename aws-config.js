import AWS from "aws-sdk";

AWS.config.update({
  region: "us-west-2", // Ajusta a tu región
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-west-2:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
  }),
});

export default AWS;
