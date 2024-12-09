import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;


export default async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectándose a MongoDB:', error);
  }
}
