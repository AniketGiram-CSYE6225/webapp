import bcrypt from 'bcrypt'
import { PubSub } from '@google-cloud/pubsub';
import dotenv from 'dotenv'
import { logger } from '../logger/index.js'
dotenv.config()

const saltRounds = 10

export const generateHash = async (password) => {
    return await bcrypt.hash(password, saltRounds)
}

export const checkHashedPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}

export const decodeBase64 = (data) => {
    return Buffer.from(data, 'base64').toString().split(":")
}

export const sendVerificationEmail = async (user) => {
    try {
        const projectID = process.env.GCP_PROJECT_ID
        const pubsub = new PubSub({ projectID });
        const topicName = process.env.PUB_SUB_TOPIC_NAME;
        const topic = pubsub.topic(topicName);
        const data = {
            "userId": user['id'],
            "username": user['username'],
            "firstName": user['firstName']
        }
        logger.debug(`publishing message to Topic: ${topicName}, with data = ${data}`)
        const dataBuffer = Buffer.from(JSON.stringify(data));
        await topic.publishMessage({ data: dataBuffer });
        logger.info(`Message Published to Topic: ${topicName}, with data = ${data}`)
    } catch (error) {
        logger.error(`Error in Publishing message to Topic ${process.env.PUB_SUB_TOPIC_NAME}, Error = ${error}`)
        console.log("Error in publishing Pub Sub message", error)
    }
}
