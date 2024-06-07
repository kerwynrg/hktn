import axios from 'axios';
import { useMutation } from 'react-query';

const BEDROCK_AGENT_URL = process.env.BEDROCK_AGENT_URL || 'http://localhost:8000';
const BEDROCK_API_KEY = process.env.BEDROCK_API_KEY || 'your-api-key';

export const useSendMessage = () => {
  return useMutation(async (message: string) => {
    console.log("🚀 ~ returnuseMutation ~ message:", message)
    const config = {
      headers: {
        'Authorization': `Bearer ${BEDROCK_API_KEY}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(`${BEDROCK_AGENT_URL}/chat`, { message }, config);
    return response.data;
  });
};