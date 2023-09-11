import mongoose from 'mongoose';

export const connect = async (uri: string) => {
  try {
    await mongoose.connect(uri, {});
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error(error);
  }
};
