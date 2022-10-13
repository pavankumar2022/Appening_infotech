import mongoose from 'mongoose';

const connectdb = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "software_company"
    }
    await mongoose.connect(DATABASE_URL, DB_OPTIONS)
    console.log('Mongodb database connected successfully');
  } catch (error) {
    console.log(error)
  }
}

export {connectdb};