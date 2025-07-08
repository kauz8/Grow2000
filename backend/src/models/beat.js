import mongoose from 'mongoose';

const BeatSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  genero: { type: String, required: true },
  preco: { type: Number, required: true },
  bpm: { type: Number },
  arquivo: { type: String, required: true }, // URL do arquivo
  artista: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dataUpload: { type: Date, default: Date.now }
});

export default mongoose.model('Beat', BeatSchema);