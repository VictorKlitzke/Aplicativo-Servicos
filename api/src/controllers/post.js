const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthController {
  async postLogin(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    try {
      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.senha);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Senha incorreta" });
      }

      const token = jwt.sign({ id: user.id }, process.env.TOKEN, { expiresIn: "3h" });
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 18000000, 
      });

      return res.json({
        authorization: true,
        token: token,
        message: "Login realizado com sucesso",
        UserId: user.id,
      });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new AuthController();