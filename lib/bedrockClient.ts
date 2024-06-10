'use server'

import { BedrockAgentRuntimeClient, InvokeAgentCommand, type InvokeAgentCommandInput } from '@aws-sdk/client-bedrock-agent-runtime';
import { v4 as uuidv4 } from 'uuid';

import {
  AWS_REGION,
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  AWS_AGENT_ID,
  AWS_AGENT_ALIAS_ID
} from './constants'

let client: BedrockAgentRuntimeClient;
let defaultPayload: InvokeAgentCommandInput;

export const initClient = () => {
  client = new BedrockAgentRuntimeClient({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_ACCESS_KEY
    },
  });

  defaultPayload = {
    agentId: AWS_AGENT_ID,
    agentAliasId: AWS_AGENT_ALIAS_ID,
    sessionId: uuidv4(),
  };
}

export const invokeAgent = async (input: string) => {
  try {
    const command = new InvokeAgentCommand({ ...defaultPayload, inputText: input });
    // const command = new ConverseCommand(payload);
    const response = await client.send(command);

    console.log("🚀 ~ invokeAgent ~ response:", response);

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

    console.log("🚀 ~ invokeAgent ~ text:", completion);

    return completion
  } catch (error) {
    console.error('Error invoking model:', error);
    throw new Error('Failed to invoke model');
  }
};
