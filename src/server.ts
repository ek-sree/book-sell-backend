import express from 'express';
import cors from 'cors';
import config from './config/config';
import { bookRouter } from './app/routes/bookRoute';
import { authRouter } from './app/routes/authRouter';
import { connectToDatabase } from './database/mongodb';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: 'https://guileless-bubblegum-0c40b9.netlify.app/',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }));
  
app.use(express.json());
app.use(cookieParser()); 

app.use('/api', bookRouter)
app.use('/api/user/', authRouter)

const port = config.port

const startServer = async () => {
  try {
      await connectToDatabase();
              app.listen(port, () => {
          console.log(`Server running on port ${port}`);
        });
  } catch (error) {
    console.log('Error starting server', error);
  }
};

startServer();