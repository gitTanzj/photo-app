import mongoose from 'mongoose';
import dotenv from 'dotenv';

mongoose.connect(dotenv.config().parsed?.MONGO_URI as string);
const database = mongoose.connection;


database.on('error', (error) => {
    console.log(error)
})
  
database.once('connected', () => {
    console.log('Database Connected');
})