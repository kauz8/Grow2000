import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    console.log("Dados recebidos:", req.body);
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            ...req.body,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json(user);
  } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciais inválidas!' });
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.json({ token });
  } catch (err) {
        res.status(500).json({ error: err.message });
    }
};