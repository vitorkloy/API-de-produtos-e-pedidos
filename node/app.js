const express = require("express");

const app = express();

const UserRouter = require("./router/UserRouter");
const LoginRouter = require("./router/LoginRouter");
const ProductRouter = require("./router/ProductRouter");
const OrderRouter = require("./router/OrderRouter");
const cors = require("cors");

const porta = 8080;
app.use(cors());
app.use(express.json());

const UserRoteador = new UserRouter();
const LoginRoteador = new LoginRouter();
const ProductRoteador = new ProductRouter();
const OrderRoteador = new OrderRouter();

app.use("/usuarios", UserRoteador.criarRotasUser());
app.use("/logar", LoginRoteador.criarRotasLogin());
app.use("/produtos", ProductRoteador.criarRotasProduct());
app.use("/pedidos", OrderRoteador.criarRotasOrder());

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
