import mongoDB from 'mongodb'
const { MongoClient } = mongoDB

import { appConfig } from '../config/app.config.ts'
import { logger } from './logger.service.js'

export const dbService = {
    getCollection
}

let dbConn = null

async function getCollection(collectionName) {
    // console.log('collectionName', collectionName)
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(appConfig.DB_URL)
        const db = client.db(appConfig.DB_NAME)
        dbConn = db
        return db
    } catch (err) {
        logger.error('Cannot Connect to DB', err)
        throw err
    }
}




