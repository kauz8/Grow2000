import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes.js';
import beatRoutes from './src/routes/beatRoutes.js';
import { connectDB } from './src/config/db.js';

const app = express();
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
connectDB();
// Rotas da API
app.use('/api/users', userRoutes);
app.use('/api/beats', beatRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

const PORT = process.env.PORT || 3330;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
