import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

let db_conn = null

function createConnection() {
    try {
        return new Sequelize({
            dialect: process.env.DIALECT,
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            port: process.env.PORT
        })
    } catch (error) {
        return response.status(503).send()
    }
}

export default db_conn = db_conn != null ? db_conn : createConnection();
