// src/routes/users.ts
import express, {Request, Response} from 'express';
import {IUser, User} from '../models/User';

const router = express.Router();

// POST /users
router.post('/', async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const {name, balance} = req.body;
        const newUser: IUser = new User({name, balance});
        const user: IUser = await newUser.save();
        const responseUser: IUser = <IUser>{
            id: user._id,
            name: user.name,
            balance: user.balance,
        };
        res.status(200).json(responseUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// GET /users/:id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({error: 'User not found'});
            return;
        }
        const responseUser: IUser = <IUser>{
            id: user._id,
            name: user.name,
            balance: user.balance,
        };
        res.json(responseUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await User.find(); // Fetch all users

        const responseUsers = users.map(user => ({
            id: user._id.toString(),
            name: user.name,
            balance: user.balance,
        }));

        res.json(responseUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
