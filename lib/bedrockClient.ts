'use server'

import { BedrockAgentRuntimeClient, InvokeAgentCommand, type InvokeAgentCommandInput } from '@aws-sdk/client-bedrock-agent-runtime';
import { v4 as uuidv4 } from 'uuid';

const client = new BedrockAgentRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  },
});

const payload: InvokeAgentCommandInput = {
  agentId: process.env.AWS_AGENT_ID!,
  agentAliasId: process.env.AWS_AGENT_ALIAS_ID!,
  sessionId: uuidv4(),
  // inputText: PROMPT,
  // enableTrace: true
};

const invokeAgent = async (input: string) => {
  try {
    const command = new InvokeAgentCommand({ ...payload, inputText: input });
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

export default invokeAgent;
