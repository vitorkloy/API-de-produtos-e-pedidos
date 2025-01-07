const MeuTokenJWT = require("../model/MeuTokenJWT");

module.exports = class JwtMiddleware {
  validate_token(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      const objMeuTokenJWT = new MeuTokenJWT();
      if (objMeuTokenJWT.validarToken(token) == true) {
        next();
      } else {
        console.log("aosidnaosdnaosndiu");
        res.status(401).json({ message: "Token inválido", status: false });
      }
    } else {
      console.log("aosidnaosdnaosndiu");
      res.status(401).json({ message: "Token inválido", status: false });
    }
  }
};
