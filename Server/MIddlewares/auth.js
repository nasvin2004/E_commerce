const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ Error: 'Authorization header is missing' });
    }
  
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ Error: 'Token is required' });
    }
  
    try {
      const decoded = jwt.verify(token, 'token-key');
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid Token' });
    }
  };
  
  module.exports = auth;
