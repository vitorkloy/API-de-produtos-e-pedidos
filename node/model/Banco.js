class Banco {
  static connect() {
    const mysql = require("mysql2");
    return mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "projeto_terceiro_bim",
      port: 3306,
    });
  }
}

module.exports = Banco;
