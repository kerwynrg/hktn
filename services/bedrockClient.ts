import AWS from 'aws-sdk'

import { BedrockAgentRuntimeClient, InvokeAgentCommand, type InvokeAgentCommandInput } from '@aws-sdk/client-bedrock-agent-runtime';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { AssumeRoleCommand, STSClient } from "@aws-sdk/client-sts";
import { v4 as uuidv4 } from 'uuid';

// let clientSTS: STSClient

// const connect = async () => {
//   clientSTS = new STSClient({ region: 'us-west-2' });

//   try {
//     // Returns a set of temporary security credentials that you can use to
//     // access Amazon Web Services resources that you might not normally
//     // have access to.
//     const command = new AssumeRoleCommand({
//       // The Amazon Resource Name (ARN) of the role to assume.
//       RoleArn: "arn:aws:iam::851725385586:role/Hackaton-STS-UI",
//       // An identifier for the assumed role session.
//       RoleSessionName: uuidv4(),
//       // The duration, in seconds, of the role session. The value specified
//       // can range from 900 seconds (15 minutes) up to the maximum session
//       // duration set for the role.
//       DurationSeconds: 900,
//     });
//     console.log('STSClient-1', clientSTS, command);
//     const response = await clientSTS.send(command);
//     console.log('STSClient-2', response);
//   } catch (err) {
//     console.log('STSClient-error', err);
//     console.error(err);
//   }
// }

const client = new BedrockAgentRuntimeClient({
  region: "us-west-2",
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: "us-west-2" },
    identityPoolId: "us-west-2:7a9f8865-2f5f-4704-8085-312913a06f2f",
  }),
});

const PROMPT = "Hi. In a short paragraph, explain what you can do.";

console.log('client', client)

// Prepare the payload for the model.
// const payload = {
//   anthropic_version: "bedrock-2023-05-31",
//   max_tokens: 1000,
//   messages: [{ role: "user", content: [{ type: "text", text: PROMPT }] }],
// };


const payload: InvokeAgentCommandInput = {
  agentId: 'T5B00SWJSL',
  agentAliasId: '6UHYIDBF8T',
  sessionId: 'testSession',
  inputText: PROMPT,
  enableTrace: true

  // body: JSON.stringify(payload), // required
  // modelId: "anthropic.claude-v2:1", // required
};

const invokeModel = async (input: string) => {
  // connect();
  try {
    const command = new InvokeAgentCommand(payload);
    const response = await client.send(command);
    console.log("🚀 ~ invokeModel ~ response:", response)

    return response
  } catch (error) {
    console.error('Error invoking model:', error);
    throw new Error('Failed to invoke model');
  }
};

export default invokeModel;

// const PROMPT = "Hi. In a short paragraph, explain what you can do.";

// const invokeAgent = async (input: string, credentials: AWS.CognitoIdentity.GetCredentialsForIdentityResponse['Credentials']) => {
//   const client = new BedrockAgentRuntimeClient({
//     region: "us-west-2",
//     credentials: {
//       secretAccessKey: credentials?.SecretKey!,
//       accessKeyId: credentials?.AccessKeyId!,
//       sessionToken: credentials?.SessionToken!
//     }
//   });

//   const payload: InvokeAgentCommandInput = {
//     agentId: 'T5B00SWJSL',
//     agentAliasId: '6UHYIDBF8T',
//     sessionId: uuidv4(),
//     inputText: input || PROMPT,
//     enableTrace: true

//     // body: JSON.stringify(payload), // required
//     // modelId: "anthropic.claude-v2:1", // required
//   };

//   try {
//     const command = new InvokeAgentCommand(payload);
//     const response = await client.send(command);
//     console.log("🚀 ~ invokeAgent ~ response:", response)

//     return response
//   } catch (error) {
//     console.error('Error invoking model:', error);
//     throw new Error('Failed to invoke model');
//   }
// };

// export default () => {
//   const CognitoIdentity = new AWS.CognitoIdentity({region: 'us-west-2'});

//   const identityPoolId = 'us-west-2:7a9f8865-2f5f-4704-8085-312913a06f2f';

//   // Get AWS credentials
//   CognitoIdentity.getId({IdentityPoolId: identityPoolId}, (err, data) => {
//     if (err) console.log(err, err.stack);
//     else {
//       const params: AWS.CognitoIdentity.GetCredentialsForIdentityInput = {
//         IdentityId: data.IdentityId!
//       };
//       CognitoIdentity.getCredentialsForIdentity(params, (err, credentials) => {
//         console.log('getCredentialsForIdentity:', err, params, credentials);
//         if (err) console.log(err, err.stack);
//         else {
//           // Use credentials to configure AWS SDK
//           AWS.config.update({
//             accessKeyId: credentials?.Credentials?.AccessKeyId,
//             secretAccessKey: credentials?.Credentials?.SecretKey,
//             sessionToken: credentials?.Credentials?.SessionToken,
//             region: 'us-west-2'
//           });

//           invokeAgent('', credentials.Credentials)

//           // Example: Invoke Bedrock agent
//           // You would need to replace this with actual code to invoke the Bedrock agent,
//           // as this step depends on the specific API or SDK provided by Bedrock.
//         }
//       });
//     }
//   });
// }
