const Order = require("../model/Order");
const User = require("../model/User");
const Product = require("../model/Product");

module.exports = class OrderMiddleware {
  validate_total(req, res, next) {
    const total = req.body.total;

    if (!total) {
      res.status(400).json({ message: "Total é obrigatório", status: false });
    } else if (total <= 0) {
      res.status(400).json({
        message: "Total deve ser maior que zero",
        status: false,
      });
    } else {
      next();
    }
  }

  validate_status(req, res, next) {
    const status = req.body.status;

    if (!status) {
      res.status(400).json({ message: "Status é obrigatório", status: false });
    } else {
      next();
    }
  }

  async validate_userId(req, res, next) {
    const userId = req.body.userId;

    if (!userId) {
      res
        .status(400)
        .json({ message: "Id do usuário é obrigatório", status: false });
    } else {
      const objUser = new User();
      objUser.id = userId;

      const user = await objUser.readById();

      if (!user) {
        res
          .status(400)
          .json({ message: "Usuário não encontrado", status: false });
      } else {
        next();
      }
    }
  }

  async validate_productId(req, res, next) {
    const productId = req.body.productId;

    if (!productId) {
      res
        .status(400)
        .json({ message: "Id do produto é obrigatório", status: false });
    } else {
      const objProduct = new Product();
      objProduct.id = productId;

      const product = await objProduct.readById();

      if (!product) {
        res
          .status(400)
          .json({ message: "Produto não encontrado", status: false });
      } else {
        next();
      }
    }
  }
};
