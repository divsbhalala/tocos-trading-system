// src/models/User.ts

import mongoose, {Document, Schema, ObjectId} from "mongoose";

interface ITransaction extends Document {
    _id: ObjectId;
    senderId: ObjectId;
    receiverId: ObjectId;
    amount: number;
}

const TransactionSchema: Schema = new Schema<ITransaction>({
    senderId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    receiverId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    amount: {type: Number, required: true},
});

const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);
export {Transaction, ITransaction};