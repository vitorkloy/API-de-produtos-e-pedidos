const express = require("express");

const OrderControl = require("../control/OrderControl");
const OrderMiddleware = require("../middleware/OrderMiddleware");
const JWTMiddleware = require("../middleware/JWTMiddleware");

module.exports = class OrderRouter {
  constructor() {
    this._router = express.Router();
    this._orderControl = new OrderControl();
    this._orderMiddleware = new OrderMiddleware();
    this._jwtMiddleware = new JWTMiddleware();
  }

  criarRotasOrder() {
    this._router.get(
      "/",
      this._jwtMiddleware.validate_token,
      this._orderControl.read_all_orders
    );
    this._router.get(
      "/:id",
      this._jwtMiddleware.validate_token,
      this._orderControl.read_order_by_id
    );
    this._router.post(
      "/",
      this._jwtMiddleware.validate_token,
      this._orderMiddleware.validate_status,
      this._orderMiddleware.validate_total,
      this._orderMiddleware.validate_userId,
      this._orderMiddleware.validate_productId,
      this._orderControl.create_order
    );
    this._router.put(
      "/:id",
      this._jwtMiddleware.validate_token,
      this._orderMiddleware.validate_status,
      this._orderControl.update_order
    );
    this._router.delete(
      "/:id",
      this._jwtMiddleware.validate_token,
      this._orderControl.delete_order
    );
    return this._router;
  }
};
