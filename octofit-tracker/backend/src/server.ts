import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/database';
import { getApiBaseUrl } from './config/api';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(routes);

async function start() {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${getApiBaseUrl()}`);
  });
}

start().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
