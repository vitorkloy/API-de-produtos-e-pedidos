const Banco = require("./Banco");

class Product {
  constructor() {
    this._id = null;
    this._name = null;
    this._description = null;
    this._price = null;
    this._stock = null;
  }

  async create() {
    const conn = Banco.connect();

    const SQL =
      "INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?)";

    try {
      const [result] = await conn
        .promise()
        .execute(SQL, [
          this._name,
          this._description,
          this._price,
          this._stock,
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

  async update() {
    const conn = Banco.connect();

    const SQL =
      "UPDATE produtos SET nome=?, descricao=?, preco=?, estoque=? WHERE id=?";

    try {
      const [result] = await conn
        .promise()
        .execute(SQL, [
          this._name,
          this._description,
          this._price,
          this._stock,
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

  async delete() {
    const conn = Banco.connect();

    const SQL = "DELETE FROM produtos WHERE id = ?";

    try {
      const [result] = await conn.promise().execute(SQL, [this._id]);
      conn.end();
      return result.affectedRows > 0;
    } catch (error) {
      conn.end();
      return false;
    }
  }

  async isProduct() {
    const conn = Banco.connect();

    const SQL = "SELECT * FROM produtos WHERE nome = ?";

    try {
      const [rows] = await conn.promise().execute(SQL, [this._name]);
      return rows.length > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async readAll() {
    const conn = Banco.connect();

    const SQL = "SELECT * FROM produtos";

    try {
      const [rows] = await conn.promise().execute(SQL);
      conn.end();
      return rows;
    } catch (error) {
      console.error(error);
      conn.end();
      return false;
    }
  }

  async readById() {
    const conn = Banco.connect();

    const SQL = "SELECT * FROM produtos WHERE id = ?";

    try {
      const [rows] = await conn.promise().execute(SQL, [this._id]);
      conn.end();
      return rows[0];
    } catch (error) {
      console.error(error);
      conn.end();
      return false;
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

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }

  get price() {
    return this._price;
  }

  set price(value) {
    this._price = value;
  }

  get stock() {
    return this._stock;
  }

  set stock(value) {
    this._stock = value;
  }
}

module.exports = Product;
