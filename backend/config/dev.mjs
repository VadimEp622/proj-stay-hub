import dotenv from 'dotenv'
dotenv.config()

export default {
  dbURL: 'mongodb://127.0.0.1:27017',
  dbName: process.env.DB_NAME
}
