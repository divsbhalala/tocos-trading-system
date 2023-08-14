// src/routes/transactions.ts
import express, {Request, Response} from 'express';
import {IUser, User} from '../models/User';
import {ITransaction, Transaction} from "../models/Transaction";

const router = express.Router();

// POST /transactions
router.post('/', async (req: Request, res: Response) => {
    try {
        const {senderId, receiverId, amount} = req.body;
        const sender: IUser | null = await User.findById(senderId);
        const receiver: IUser | null = await User.findById(receiverId);
        if (!sender || !receiver) {
            res.status(404).json({error: 'User not found'});
            return;
        }
        if (sender.balance < amount) {
            res.status(200).json({error: 'Insufficient balance'});
            return;
        }
        // Perform transaction
        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save();
        await receiver.save();
        const newTransaction: ITransaction = new Transaction({senderId, receiverId, amount});
        const transaction: ITransaction = await newTransaction.save();
        const responseTransaction: ITransaction = <ITransaction>{
            id: transaction._id,
            senderId: transaction.senderId,
            receiverId: transaction.receiverId,
            amount: transaction.amount,
        };
        res.status(200).json({
            ...responseTransaction,
            message: 'Transaction successful'
        });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
        return;
    }
});
router.get('/', async (req: Request, res: Response) => {
    try {
        const transactions = await Transaction.aggregate([
            {
                $lookup: {
                    from: "users", // Name of the 'Floor' collection (lowercase pluralized)
                    localField: "senderId", // Field from the 'Building' collection
                    foreignField: "_id", // Field from the 'Floor' collection
                    as: "sender", // Output array field to store the matched floors
                },
            },
            {
                $unwind: "$sender",
            },
            {
                $lookup: {
                    from: "users", // Name of the 'Floor' collection (lowercase pluralized)
                    localField: "receiverId", // Field from the 'Building' collection
                    foreignField: "_id", // Field from the 'Floor' collection
                    as: "receiver", // Output array field to store the matched floors
                },
            },
            {
                $unwind: "$receiver",
            },

        ]); // Fetch all users

        const responseTransactios = transactions.map(transaction => ({
            id: transaction._id.toString(),
            sender: transaction.sender,
            receiver: transaction.receiver,
            amount: transaction.amount,
        }));

        res.json(responseTransactios);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export default router;
