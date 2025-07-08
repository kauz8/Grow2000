import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB!');
  } catch (err) {
    console.error('💥 Falha na conexão:', err.message);
    process.exit(1);
  }
};