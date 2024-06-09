import AWS from 'aws-sdk'

import { BedrockAgentRuntimeClient, InvokeAgentCommand, type InvokeAgentCommandInput } from '@aws-sdk/client-bedrock-agent-runtime';
import { ConverseCommand } from '@aws-sdk/client-bedrock-runtime';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { AssumeRoleCommand, STSClient } from "@aws-sdk/client-sts";
import { v4 as uuidv4 } from 'uuid';

const client = new BedrockAgentRuntimeClient({
  region: "us-west-2",
  credentials: {
    accessKeyId: '',
    secretAccessKey: '',
  },
  // credentials: fromCognitoIdentityPool({
  //   clientConfig: { region: "us-west-2" },
  //   identityPoolId: "us-west-2:7a9f8865-2f5f-4704-8085-312913a06f2f",
  // }),
});

const PROMPT = "Hi. In a short paragraph, explain what you can do.";

console.log('client', client)

const payload: InvokeAgentCommandInput = {
  agentId: 'FA9XCNRFEX',
  agentAliasId: 'XPYMPODZSA',
  sessionId: 'testSession',
  inputText: PROMPT,
  // enableTrace: true
};

const invokeAgent = async (input: string) => {
  try {
    const command = new InvokeAgentCommand({ ...payload, inputText: input });
    // const command = new ConverseCommand(payload);
    const response = await client.send(command);

    if (!response.completion) {
      return
    }

    let completion = "";

    for await (const chunkEvent of response.completion) {
      if (chunkEvent.chunk) {
        const chunk = chunkEvent.chunk;
        let decoded = new TextDecoder("utf-8").decode(chunk.bytes);
        completion += decoded;
      }
    }

    // Decode and return the response(s)
    // const decodedResponseBody = new TextDecoder().decode((response as any).body);
    // /** @type {ResponseBody} */
    // const responseBody = JSON.parse(decodedResponseBody);
    // const responses = responseBody.content;

    console.log("🚀 ~ invokeModel ~ response:", completion)

    return completion
  } catch (error) {
    console.error('Error invoking model:', error);
    throw new Error('Failed to invoke model');
  }
};

export default invokeAgent;
