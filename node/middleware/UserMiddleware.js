const User = require("../model/User");

module.exports = class UserMiddleware {
  validate_name(req, res, next) {
    const nome = req.body.nome;

    if (!nome) {
      res.status(400).json({ message: "Nome é obrigatório", status: false });
    } else if (nome.length < 3) {
      res.status(400).json({
        message: "Nome deve ter no mínimo 3 caracteres",
        status: false,
      });
    } else {
      next();
    }
  }

  validade_email(req, res, next) {
    const email = req.body.email;

    if (!email) {
      res.status(400).json({ message: "Email é obrigatório", status: false });
    } else if (!email.includes("@")) {
      res.status(400).json({ message: "Email inválido", status: false });
    } else {
      next();
    }
  }

  validate_password(req, res, next) {
    const password = req.body.senha;

    if (!password) {
      res.status(400).json({ message: "Senha é obrigatória", status: false });
    } else if (password.length < 6) {
      res.status(400).json({
        message: "Senha deve ter no mínimo 6 caracteres",
        status: false,
      });
    } else {
      next();
    }
  }

  validate_address(req, res, next) {
    const address = req.body.endereco;

    if (!address) {
      res
        .status(400)
        .json({ message: "Endereço é obrigatório", status: false });
    } else {
      next();
    }
  }

  validade_telephone(req, res, next) {
    const telephone = req.body.telefone;

    if (!telephone) {
      res
        .status(400)
        .json({ message: "Telefone é obrigatório", status: false });
    } else if (telephone.length < 11) {
      res.status(400).json({
        message: "Telefone deve ter no mínimo 11 caracteres",
        status: false,
      });
    } else {
      next();
    }
  }

  async userAlreadyExists(req, res, next) {
    const { email } = req.body;
    const objUser = new User();

    objUser.email = email;

    const existingUser = await objUser.isUser();

    if (existingUser) {
      res.status(400).json({
        message: "Usuário já cadastrado",
        status: false,
      });
    } else {
      next();
    }
  }
};
