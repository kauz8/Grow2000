import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true,},
    password: { type: String, required: true, select: false },
    cep: { type: String, required: true },
    rua: { type: String },
    bairro: { type: String },
    cidade: { type: String },
    estado: { type: String },
    dataCadastro: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);