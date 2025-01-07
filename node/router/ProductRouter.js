const express = require("express");

const ProductControl = require("../control/ProductControl");
const ProductMiddleware = require("../middleware/ProductMiddleware");
const JWTMiddleware = require("../middleware/JWTMiddleware");

module.exports = class ProductRouter {
  constructor() {
    this._router = express.Router();
    this._productControl = new ProductControl();
    this._productMiddleware = new ProductMiddleware();
    this._jwtMiddleware = new JWTMiddleware();
  }

  criarRotasProduct() {
    const multer = require("multer");
    const upload = multer({ dest: "uploads/" });
    this._router.post(
      "/json",
      this._jwtMiddleware.validate_token,
      upload.single("variavelArquivo"),
      this._productControl.create_product_json
    );

    this._router.get(
      "/",
      this._jwtMiddleware.validate_token,
      this._productControl.read_all_products
    );
    this._router.get(
      "/:id",
      this._jwtMiddleware.validate_token,
      this._productControl.read_product_by_id
    );
    this._router.post(
      "/",
      this._jwtMiddleware.validate_token,
      this._productMiddleware.validate_name,
      this._productMiddleware.validate_price,
      this._productMiddleware.validate_description,
      this._productMiddleware.productAlreadyExists,
      this._productControl.create_product
    );
    this._router.put(
      "/:id",
      this._jwtMiddleware.validate_token,
      this._productMiddleware.validate_name,
      this._productMiddleware.validate_price,
      this._productMiddleware.validate_description,
      this._productControl.update_product
    );
    this._router.delete(
      "/:id",
      this._jwtMiddleware.validate_token,
      this._productControl.delete_product
    );
    return this._router;
  }
};
