import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/index';
import userRouter from './routes/users';


mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => console.log('Database Connected')).catch((error) => console.log(error));


const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRouter);
app.use('/api/todos', router);




export default app;
