import { DataTypes, Model, Sequelize } from 'sequelize'
import sequelize from '../database/index.js'

class User extends Model { }

const user = {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
    },
    account_created: {
        type: DataTypes.DATE
    },
    account_updated: {
        type: DataTypes.DATE
    }
}

User.init(user, {
    sequelize,
    timestamps: true,
    createdAt: 'account_created',
    updatedAt: 'account_updated',
    modelName: 'User'
});

export default User
