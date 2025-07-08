import express from 'express';
import { loginUser, registerUser } from '../controllers/users.js';
import authMiddleware from '../middlewares/auth.js'; 

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);
router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: "🎤 Acesso liberado, artista!",
    user: req.user
  });
});

export default router;