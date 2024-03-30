import dotenv from "dotenv";
dotenv.config()
import mongoose from 'mongoose';
import app from './app/app';

// Data from .env
const port = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI

// Connect to MongoDB
mongoose.connect(DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

