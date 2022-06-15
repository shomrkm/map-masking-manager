import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
// import xss from 'xss-clean';
import cors from 'cors';
import { connectDB } from './config/db';
import { router as tasks } from './routes/Tasks';
import { router as users } from './routes/Users';
import { errorHandler } from './middleware';

dotenv.config({ path: './config/.env' });

connectDB();

const app: Application = express();

// Body parser
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sanitize data (measure for NoSQL Ingection)
app.use(mongoSanitize());
// Set security headers
app.use(helmet());
// Prevent XSS attacks
// app.use(xss());

// Enable cors
app.use(cors());

// Mount Router
app.use('/api/v1/tasks', tasks);
app.use('/api/v1/users', users);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(colors.yellow.bold(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
});

// Handle unhandled rejections
process.on('unhandledRejection', (err: Error, promise) => {
  console.log(colors.red.bold(`Error: ${err.message}`));
  server.close(() => process.exit(1));
});
