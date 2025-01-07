const { create } = require("domain");
const Product = require("../model/Product");

module.exports = class ProductControl {
  async create_product_json(req, res) {
    const fs = require("fs");

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Arquivo não enviado", status: false });
    }
    const products = [];

    fs.readFile(req.file.path, "utf8", async (err, data) => {
      if (err) {
        console.error(err);
        return res
          .status(400)
          .json({ message: "Erro ao ler arquivo", status: false });
      }
      const products = JSON.parse(data).produtos;
      const createdProducts = [];

      products.forEach((product) => {
        var productClass = new Product();

        productClass.name = product.nome;
        productClass.description = product.descricao;
        productClass.price = product.preco;
        productClass.stock = product.estoque;

        productClass.create();

        createdProducts.push(productClass);
      });

      res.status(201).json({
        message: "Produtos criados com sucesso",
        status: true,
        createdProducts,
      });
    });
  }

  async create_product(req, res) {
    const { nome, descricao, preco, estoque } = req.body;

    var product = new Product();

    product.name = nome;
    product.description = descricao;
    product.price = preco;
    product.stock = estoque;

    const isCreated = await product.create();

    if (!isCreated) {
      res.status(400).json({ message: "Erro ao criar produto", status: false });
    } else {
      res.status(201).json({
        message: "Produto criado com sucesso",
        status: true,
        productId: product.id,
      });
    }
  }

  async read_all_products(req, res) {
    const product = new Product();

    const products = await product.readAll();

    if (!products) {
      res
        .status(400)
        .json({ message: "Erro ao buscar produtos", status: false });
    } else {
      res
        .status(200)
        .json({ message: "Produtos encontrados", status: true, products });
    }
  }

  async read_product_by_id(req, res) {
    const { id } = req.params;

    var productClass = new Product();

    productClass.id = id;

    const product = await productClass.readById();

    if (!product) {
      res
        .status(400)
        .json({ message: "Erro ao buscar produto", status: false });
    } else {
      res
        .status(200)
        .json({ message: "Produto encontrado", status: true, product });
    }
  }

  async update_product(req, res) {
    const { id } = req.params;
    const { nome, descricao, preco, estoque } = req.body;

    var product = new Product();

    product.id = id;
    product.name = nome;
    product.description = descricao;
    product.price = preco;
    product.stock = estoque;

    const isUpdated = await product.update();

    if (!isUpdated) {
      res
        .status(400)
        .json({ message: "Erro ao atualizar produto", status: false });
    } else {
      res
        .status(200)
        .json({ message: "Produto atualizado com sucesso", status: true });
    }
  }

  async delete_product(req, res) {
    const { id } = req.params;

    var product = new Product();

    product.id = id;

    const isDeleted = await product.delete();

    if (!isDeleted) {
      res
        .status(400)
        .json({ message: "Erro ao deletar produto", status: false });
    } else {
      res
        .status(204)
        .json({ message: "Produto deletado com sucesso", status: true });
    }
  }
};
