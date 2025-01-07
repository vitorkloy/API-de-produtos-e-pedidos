const Order = require("../model/Order");

module.exports = class OrderControl {
  async create_order(req, res) {
    const { productId, total, userId, data } = req.body;

    var order = new Order();

    order.productId = productId;
    order.total = total;
    order.clientId = userId;

    const isCreated = await order.create();

    if (!isCreated) {
      res.status(400).json({ message: "Erro ao criar pedido", status: false });
    } else {
      res.status(201).json({
        message: "Pedido criado com sucesso",
        status: true,
        orderId: order.id,
      });
    }
  }

  async read_all_orders(req, res) {
    const order = new Order();

    const orders = await order.readAll();

    if (!orders) {
      res
        .status(400)
        .json({ message: "Erro ao buscar pedidos", status: false });
    } else {
      res
        .status(200)
        .json({ message: "Pedidos encontrados", status: true, orders });
    }
  }

  async read_order_by_id(req, res) {
    const { id } = req.params;

    var orderClass = new Order();

    orderClass.id = id;

    const order = await orderClass.readById();

    if (!order) {
      res.status(400).json({ message: "Erro ao buscar pedido", status: false });
    } else {
      res
        .status(200)
        .json({ message: "Pedido encontrado", status: true, order });
    }
  }

  async update_order(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    var order = new Order();

    order.id = id;
    order.status = status;

    const isUpdated = await order.update();

    if (!isUpdated) {
      res
        .status(400)
        .json({ message: "Erro ao atualizar pedido", status: false });
    } else {
      res.status(200).json({ message: "Pedido atualizado", status: true });
    }
  }

  async delete_order(req, res) {
    const { id } = req.params;

    var order = new Order();

    order.id = id;

    const isDeleted = await order.delete();

    if (!isDeleted) {
      res
        .status(400)
        .json({ message: "Erro ao deletar pedido", status: false });
    } else {
      res.status(204).json({ message: "Pedido deletado", status: true });
    }
  }
};
