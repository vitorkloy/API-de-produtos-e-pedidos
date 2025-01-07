const Banco = require("./Banco");

class User {
  constructor() {
    this._id = null;
    this._name = null;
    this._email = null;
    this._address = null;
    this._telephone = null;
    this._password = null;
  }

  async login() {
    const conn = Banco.connect();

    const SQL =
      "SELECT COUNT(*) AS qtd, id, nome, email, endereco, telefone from usuarios WHERE email=? and senha = MD5(?)";

    try {
      const [data] = await conn
        .promise()
        .query(SQL, [this._email, this._password]);
      this._id = data[0].id;
      this._name = data[0].nome;
      this._address = data[0].endereco;
      this._telephone = data[0].telefone;

      conn.end();
      return data[0].qtd > 0;
    } catch (error) {
      console.error(error);
      conn.end();
      return null;
    }
  }

  async create() {
    const conn = Banco.connect();

    const SQL =
      "INSERT INTO usuarios (nome, email, endereco, telefone, senha) VALUES (?, ?, ?, ?, MD5(?))";

    try {
      const [result] = await conn
        .promise()
        .execute(SQL, [
          this._name,
          this._email,
          this._address,
          this._telephone,
          this._password,
        ]);
      this._id = result.insertId;
      conn.end();
      return result.affectedRows > 0;
    } catch (error) {
      console.error(error);
      conn.end();
      return false;
    }
  }

  async delete() {
    const conn = Banco.connect();

    const SQL = "DELETE FROM usuarios WHERE id = ?";

    try {
      const [result] = await conn.promise().execute(SQL, [this._id]);
      conn.end();
      return result.affectedRows > 0;
    } catch (error) {
      conn.end();
      return false;
    }
  }

  async update() {
    const conn = Banco.connect();

    const SQL =
      "UPDATE usuarios SET nome = ?, email = ?, endereco = ?, telefone = ?, senha = MD5(?) WHERE id = ?";

    try {
      const [result] = await conn
        .promise()
        .execute(SQL, [
          this._name,
          this._email,
          this._address,
          this._telephone,
          this._password,
          this._id,
        ]);
      conn.end();
      return result.affectedRows > 0;
    } catch (error) {
      console.error(error);
      conn.end();
      return false;
    }
  }

  async isUser() {
    const conn = Banco.connect();

    const SQL = "SELECT COUNT(*) AS total FROM usuarios WHERE email = ?";

    try {
      const [rows] = await conn.promise().execute(SQL, [this._email]);
      conn.end();
      return rows[0].total > 0;
    } catch (error) {
      console.error(error);
      conn.end();
      return false;
    }
  }

  async readAll() {
    const conn = Banco.connect();

    const SQL = "SELECT * FROM usuarios";

    try {
      const [rows] = await conn.promise().query(SQL);
      conn.end();
      return rows;
    } catch (error) {
      console.error(error);
      conn.end();
      return [];
    }
  }

  async readById() {
    const conn = Banco.connect();

    const SQL = "SELECT * FROM usuarios WHERE id = ?";

    try {
      const [rows] = await conn.promise().query(SQL, [this._id]);
      conn.end();
      return rows[0];
    } catch (error) {
      console.error(error);
      conn.end();
      return null;
    }
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get email() {
    return this._email;
  }

  set email(value) {
    this._email = value;
  }

  get address() {
    return this._address;
  }

  set address(value) {
    this._address = value;
  }

  get telephone() {
    return this._telephone;
  }

  set telephone(value) {
    this._telephone = value;
  }

  get password() {
    return this._password;
  }

  set password(value) {
    this._password = value;
  }
}

module.exports = User;
