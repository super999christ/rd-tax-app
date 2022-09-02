import * as dotenv from 'dotenv';

dotenv.config();

export const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
export const MONGODB_URI = `mongodb+srv://CodyChrist:${process.env.MONGO_PASSWORD}@cluster0.63yx8se.mongodb.net/?retryWrites=true&w=majority`;