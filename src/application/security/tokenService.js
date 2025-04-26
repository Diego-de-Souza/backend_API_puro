const jwt = require('jsonwebtoken');

class TokenService {
  generateToken(payload) {
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '1h' };

    return jwt.sign(payload, secret, options);
  }

  verifyToken(token) {
    const secret = process.env.JWT_SECRET;
    return jwt.verify(token, secret);
  }
}

module.exports = TokenService;
