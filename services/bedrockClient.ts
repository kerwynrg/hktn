import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const client = new BedrockRuntimeClient({
  region: "us-west-2",
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: "us-west-2" },
    identityPoolId: "us-west-2:46e2cc5f-8131-44fd-b5c0-336a716cb301",
  }),
});

const PROMPT = "Hi. In a short paragraph, explain what you can do.";

// Prepare the payload for the model.
const payload = {
  anthropic_version: "bedrock-2023-05-31",
  max_tokens: 1000,
  messages: [{ role: "user", content: [{ type: "text", text: PROMPT }] }],
};


const params = {
  body: JSON.stringify(payload), // required
  modelId: "anthropic.claude-v2:1", // required
};

const invokeModel = async (input: string) => {
  try {
    const command = new InvokeModelCommand(params);
    const response = await client.send(command);
    console.log("🚀 ~ invokeModel ~ response:", response)

    return response
  } catch (error) {
    console.error('Error invoking model:', error);
    throw new Error('Failed to invoke model');
  }
};

export default invokeModel;