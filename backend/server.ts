import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv';
import colors from 'colors';
import { connectDB } from './config/db';

dotenv.config({ path: './config/.env' })

connectDB();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (_req: Request, res: Response) => {
  return res.status(200).send({
    message: 'Hello World!',
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
});

// Handle unhandled rejections
process.on('unhandledRejection', (err: Error, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  server.close(() => process.exit(1));
});
