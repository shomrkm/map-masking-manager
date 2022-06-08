import { connect } from 'mongoose';

const MONGO_URI: string = process.env.MONGO_URI as string;

export const connectDB = async () => {
  const conn = await connect(MONGO_URI);
  console.log(`MongoDB Connected: ${conn.connection.host}`.green.underline.bold);
}
