// src/models/User.ts

import mongoose, { Document, Schema, ObjectId } from "mongoose";

interface IUser extends  Document {
    _id: ObjectId;
    name: string;
    balance: number;
}

const UserSchema: Schema = new Schema<IUser>({
    name: { type: String, required: true },
    balance: { type: Number, required: true },
});

const User= mongoose.model<IUser>('User', UserSchema);
export { User, IUser };