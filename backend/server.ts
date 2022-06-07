import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config({ path: './config/.env' })

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (_req: Request, res: Response) => {
  return res.status(200).send({
    message: 'Hello World!',
  });
});

const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, () => {
    console.log(colors.yellow.bold(`dev server running at: http://localhost:${PORT}/`));
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}

