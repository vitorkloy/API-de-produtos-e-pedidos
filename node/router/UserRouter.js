const express = require("express");

const UserControl = require("../control/UserControl");
const UserMiddleware = require("../middleware/UserMiddleware");

module.exports = class UserRouter {
  constructor() {
    this._router = express.Router();
    this._userControl = new UserControl();
    this._userMiddleware = new UserMiddleware();
  }

  criarRotasUser() {
    this._router.get("/", this._userControl.read_all_users);
    this._router.get("/:id", this._userControl.read_user_by_id);
    this._router.post(
      "/",
      this._userMiddleware.validate_name,
      this._userMiddleware.validade_email,
      this._userMiddleware.validate_password,
      this._userMiddleware.validate_address,
      this._userMiddleware.validade_telephone,
      this._userMiddleware.userAlreadyExists,
      this._userControl.create_user
    );
    this._router.put(
      "/:id",
      this._userMiddleware.validate_name,
      this._userMiddleware.validade_email,
      this._userMiddleware.validate_password,
      this._userMiddleware.validate_address,
      this._userMiddleware.validade_telephone,
      this._userControl.update_user
    );
    this._router.delete("/:id", this._userControl.delete_user);
    return this._router;
  }
};
