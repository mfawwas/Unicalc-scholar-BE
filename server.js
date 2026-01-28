import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import recordRoutes from './src/routes/record.routes.js';

const app = express();
const PORT = process.env.PORT || 4000

app.use(express.json());
app.use(morgan('dev'));

connectDB();

app.get('/', (req, res) => {
  res.send('Unicalc Backend in development progress');
});

app.use('/api/auth', authRoutes);
app.use('/api/records', recordRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});