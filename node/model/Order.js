const Banco = require("./Banco");

class Order {
  constructor() {
    this._id = null;
    this._status = null;
    this._total = null;
    this._clientId = null;
    this._productId = null;
    this._date = null;
    this._productName = null;
    this._clientName = null;
  }

  async create() {
    const conn = await Banco.connect();

    try {
      conn.beginTransaction();
      var SQL = "INSERT INTO pedidos (valor_total, usuarios_id) VALUES (?, ?)";

      const result = await conn
        .promise()
        .query(SQL, [this._total, this._clientId]);
      this._id = result[0].insertId;

      SQL =
        "INSERT INTO pedidos_has_produtos (pedidos_id, produtos_id) VALUES (?, ?)";
      await conn.promise().query(SQL, [this._id, this._productId]);

      conn.commit();
    } catch (error) {
      console.log("rollback");
      conn.rollback();
      conn.end();
      return false;
    }

    conn.end();
    return true;
  }

  async update() {
    const conn = await Banco.connect();

    const SQL = "UPDATE pedidos SET status=? WHERE id=?";

    try {
      const result = await conn.promise().query(SQL, [this._status, this._id]);
      conn.end();
      return result.changedRows != 0;
    } catch (error) {
      conn.end();
      return false;
    }
  }

  async delete() {
    const conn = await Banco.connect();

    try {
      conn.beginTransaction();
      var SQL = "DELETE FROM pedidos_has_produtos WHERE pedidos_id=?";
      await conn.promise().query(SQL, [this._id]);

      SQL = "DELETE FROM pedidos WHERE id=?";
      await conn.promise().query(SQL, [this._id]);

      conn.commit();
    } catch (error) {
      conn.rollback();
      conn.end();
      return false;
    }

    conn.end();
    return true;
  }

  async readAll() {
    const conn = await Banco.connect();

    const SQL =
      "SELECT pedidos.*, produtos.nome AS nome_produto, usuarios.nome AS nome_usuario FROM pedidos INNER JOIN pedidos_has_produtos ON pedidos.id = pedidos_has_produtos.pedidos_id INNER JOIN produtos ON pedidos_has_produtos.produtos_id = produtos.id INNER JOIN usuarios ON pedidos.usuarios_id = usuarios.id";

    try {
      const [rows] = await conn.promise().query(SQL);
      conn.end();
      return rows;
    } catch (error) {
      return [];
    }
  }

  async readById() {
    const conn = await Banco.connect();

    const SQL =
      "SELECT pedidos.*, produtos.nome AS nome_produto, usuarios.nome AS nome_usuario FROM pedidos INNER JOIN pedidos_has_produtos ON pedidos.id = pedidos_has_produtos.pedidos_id INNER JOIN produtos ON pedidos_has_produtos.produtos_id = produtos.id INNER JOIN usuarios ON pedidos.usuarios_id = usuarios.id WHERE pedidos.id=?";

    try {
      const [rows] = await conn.promise().query(SQL, [this._id]);
      conn.end();
      return rows;
    } catch (error) {
      conn.end();
      return [];
    }
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get total() {
    return this._total;
  }

  set total(value) {
    this._total = value;
  }

  get clientId() {
    return this._clientId;
  }

  set clientId(value) {
    this._clientId = value;
  }

  get productId() {
    return this._productId;
  }

  set productId(value) {
    this._productId = value;
  }
}

module.exports = Order;
