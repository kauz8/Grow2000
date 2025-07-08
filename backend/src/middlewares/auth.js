import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      error: "🔒 Acesso negado! Token não fornecido ou mal formatado.",
      dica: "Use: 'Bearer <token>' no cabeçalho 'Authorization'."
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      error: err.name === 'TokenExpiredError' 
        ? "⏳ Token expirado!" 
        : "❌ Token inválido!",
      detalhes: err.message
    });
  }
};

export default authMiddleware;