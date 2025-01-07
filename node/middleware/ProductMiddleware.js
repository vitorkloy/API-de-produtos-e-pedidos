const Product = require("../model/Product");

module.exports = class ProductMiddleware {
  validate_name(req, res, next) {
    const name = req.body.nome;

    if (!name) {
      res.status(400).json({ message: "Nome é obrigatório", status: false });
    } else if (name.length < 3) {
      res.status(400).json({
        message: "Nome deve ter no mínimo 3 caracteres",
        status: false,
      });
    } else {
      next();
    }
  }

  validate_price(req, res, next) {
    const price = req.body.preco;

    if (!price) {
      res.status(400).json({ message: "Preço é obrigatório", status: false });
    } else if (price <= 0) {
      res.status(400).json({
        message: "Preço deve ser maior que zero",
        status: false,
      });
    } else {
      next();
    }
  }

  validate_description(req, res, next) {
    const description = req.body.descricao;

    if (!description) {
      res
        .status(400)
        .json({ message: "Descrição é obrigatória", status: false });
    } else {
      next();
    }
  }

  async productAlreadyExists(req, res, next) {
    const name = req.body.nome;

    const objProduct = new Product();

    objProduct.name = name;

    const product = await objProduct.isProduct();

    if (product) {
      res.status(400).json({
        message: "Produto já cadastrado",
        status: false,
      });
    } else {
      next();
    }
  }
};
