import mongoose, { Schema, Document } from "mongoose";


interface UserSessionModel extends Document {
    userId: mongoose.Schema.Types.ObjectId,
    sessionId: string,
    active: boolean,
    startDate: Date,
    endDate: Date,
};


const userSessionSchema: Schema<UserSessionModel> = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    sessionId: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
    }
});


const UserSession = mongoose.model<UserSessionModel>("userSession", userSessionSchema);



export {
    UserSession,
    UserSessionModel,
};