import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// import route
import route from './routes/routes.js';
import auth from './routes/auth.js';

mongoose.connect('mongodb://127.0.0.1:27017/wpu', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Mongoose connection opened'));

app.use(cors());
app.use(express.json());

// use routes
app.use('/books', route);
app.use('/api/user', auth);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
