import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

let db_conn = null

function createConnection() {
    return new Sequelize({
        dialect: process.env.DIALECT,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: process.env.PORT
    })
}

export default db_conn = db_conn != null ? db_conn : createConnection();