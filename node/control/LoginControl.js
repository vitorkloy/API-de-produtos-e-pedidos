const express = require("express");
const User = require("../model/User");
const MeuTokenJWT = require("../model/MeuTokenJWT");

module.exports = class LoginControl {
  async login(req, res) {
    const user = new User();

    user.email = req.body.email;
    user.password = req.body.senha;

    const isLoggedIn = await user.login();

    if (isLoggedIn) {
      const payload = {
        email: user.email,
        telephone: user.telephone,
        name: user.name,
        id: user.id,
      };

      const jwt = new MeuTokenJWT();
      const token = jwt.generateToken(payload);

      res
        .status(200)
        .json({ message: "Usuário logado com sucesso", status: true, token });
    } else {
      res.status(401).json({
        message: "Usuário ou senha inválidos",
        status: false,
      });
    }
  }
};
