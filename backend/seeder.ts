import fs from 'fs';
import { connect, Schema } from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' })

import { Task } from './models/Tasks';

// Connect to DB
connect(process.env.MONGO_URI as string);

// Read JSON files
const tasks = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/tasks.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Task.create(tasks);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Task.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}