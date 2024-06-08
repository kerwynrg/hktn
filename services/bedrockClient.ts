import axios from 'axios';
import { useMutation } from 'react-query';

import AWS from '../aws-config';

const bedrock = new AWS.Service({
  // @ts-ignore
  apiConfig: require('../bedrock-sdk-config.json'),
});

const invokeModel = async (input: string) => {
  try {
    // @ts-ignore
    const response = await bedrock.invokeModel({
      modelId: 'tu-modelo-id',
      input: { message: input },
    }).promise();
    return response.result;
  } catch (error) {
    console.error('Error invoking model:', error);
    throw new Error('Failed to invoke model');
  }
};

export default invokeModel;