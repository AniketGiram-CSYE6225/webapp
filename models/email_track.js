import { DataTypes, Model, Sequelize } from 'sequelize'
import sequelize from '../database/index.js'
import User from './user.js';

class EmailTrack extends Model { }

const emailTrackAttributes = {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    emailStatus: {
        type: DataTypes.ENUM('EMAIL_SENT', 'EMAIL_VERIFIED'),
        default: "EMAIL_SENT"
    },
    emailSentTime: {
        type: DataTypes.DATE
    },
    emailReSentTimeUpdate: {
        type: DataTypes.DATE
    }
}

EmailTrack.init(emailTrackAttributes, {
    sequelize,
    timestamps: true,
    createdAt: 'emailSentTime',
    updatedAt: 'emailReSentTimeUpdate',
    modelName: 'emailtrack'
});

export default EmailTrack
