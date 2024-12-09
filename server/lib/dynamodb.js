import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const config = useRuntimeConfig();

// Configurar DynamoDB con AWS SDK v3
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});



// DynamoDB Document Client
const dynamoDB = DynamoDBDocumentClient.from(client);

export default dynamoDB;