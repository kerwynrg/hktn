import { BedrockAgentRuntimeClient, InvokeAgentCommand, type InvokeAgentCommandInput } from '@aws-sdk/client-bedrock-agent-runtime';
import { v4 } from 'uuid';

const client = new BedrockAgentRuntimeClient({
  region: "us-west-2",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '',
  },
});

const payload: InvokeAgentCommandInput = {
  agentId: 'FA9XCNRFEX',
  agentAliasId: 'OQJ4VXJICI',
  sessionId: v4(),
  // inputText: PROMPT,
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

    console.log("🚀 ~ invokeModel ~ response:", completion)

    return completion
  } catch (error) {
    console.error('Error invoking model:', error);
    throw new Error('Failed to invoke model');
  }
};

export default invokeAgent;
