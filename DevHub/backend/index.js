import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const PORT = process.env.PORT || 5000;

dotenv.config();

// console.log(process.env.CONNECTION_URL);
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);



mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));
