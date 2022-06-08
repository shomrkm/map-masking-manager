import fs from 'fs';
import { connect, Schema } from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

import { Task } from './models/Tasks';

// Usage
// npx ts-node seeder <option>

// Connect to DB
connect(process.env.MONGO_URI as string);

// Read JSON files
const tasks = JSON.parse(fs.readFileSync(`${__dirname}/_data/tasks.json`, 'utf-8'));
console.log(tasks);

// Import into DB
const importData = async () => {
  try {
    await Task.create(tasks);
    console.log(colors.green.inverse('Data Imported...'));
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Task.deleteMany();
    console.log(colors.red.inverse('Data Destroyed...'));
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
