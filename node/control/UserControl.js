const User = require("../model/User");

module.exports = class UserControl {
  async create_user(req, res) {
    const { nome, email, endereco, telefone, senha } = req.body;

    var user = new User();

    user.name = nome;
    user.email = email;
    user.address = endereco;
    user.telephone = telefone;
    user.password = senha;

    const isCreated = await user.create();

    if (!isCreated) {
      res.status(400).json({ message: "Erro ao criar usuário", status: false });
    } else {
      res
        .status(201)
        .json({ message: "Usuário criado com sucesso", status: true, user });
    }
  }

  async read_all_users(req, res) {
    const user = new User();

    const users = await user.readAll();

    if (!users) {
      res
        .status(400)
        .json({ message: "Erro ao buscar usuários", status: false });
    } else {
      res
        .status(200)
        .json({ message: "Usuários encontrados", status: true, users });
    }
  }

  async read_user_by_id(req, res) {
    const { id } = req.params;

    var user = new User();

    user.id = id;

    const readUser = await user.readById();

    if (!readUser) {
      res
        .status(400)
        .json({ message: "Erro ao buscar usuário", status: false });
    } else {
      res
        .status(200)
        .json({ message: "Usuário encontrado", status: true, user: readUser });
    }
  }

  async update_user(req, res) {
    const { id } = req.params;
    const { nome, email, endereco, telefone, senha } = req.body;

    var user = new User();

    user.id = id;
    user.name = nome;
    user.email = email;
    user.address = endereco;
    user.telephone = telefone;
    user.password = senha;

    const isUpdated = await user.update();

    if (!isUpdated) {
      res
        .status(400)
        .json({ message: "Erro ao atualizar usuário", status: false });
    } else {
      res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso", status: true });
    }
  }

  async delete_user(req, res) {
    const { id } = req.params;

    var user = new User();

    user.id = id;

    const isDeleted = await user.delete();

    if (!isDeleted) {
      res
        .status(400)
        .json({ message: "Erro ao deletar usuário", status: false });
    } else {
      res
        .status(204)
        .json({ message: "Usuário deletado com sucesso", status: true });
    }
  }
};
