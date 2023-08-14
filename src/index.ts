// src/index.ts
import express from 'express';
import mongoose, { ConnectOptions }  from 'mongoose';
import usersRouter from './routes/users';
import transactionsRouter from './routes/transactions';
import cors from 'cors';
export const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
// MongoDB connection
 mongoose.connect('mongodb+srv://zerone:pw5uxP3Psi3no46A@emsys.vnljxn1.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}as ConnectOptions).then((db) => {
    console.log('Connected to MongoDB');
 }).catch((err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
 });

// Middleware
app.use(express.json());

// Routes
app.use('/users', usersRouter);
app.use('/transactions', transactionsRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
export default app;
