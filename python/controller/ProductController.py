from flask import jsonify
from model.Products import Products

class ProductController:
    def __init__(self):
        self._product = Products()
        
    def validate_name(self):
        if not self._product._name:
            raise ValueError("Nome não pode ser vazio")
        if len(self._product._name) < 3:
            raise ValueError("Nome não pode ser menor do que 3 caracteres")
        
    def validate_description(self):
        if not self._product._description:
            raise ValueError("Descrição não pode ser vazia")
        if len(self._product._description) < 10:
            raise ValueError("Descrição não pode ser menor do que 10 caracteres")
        
    def validate_price(self):
        if not self._product._price:
            raise ValueError("Preço não pode ser vazio")
        if self._product._price < 0:
            raise ValueError("Preço não pode ser negativo")
        
    def validate_stock(self):
        if not self._product._stock:
            raise ValueError("Estoque não pode ser vazio")
        if self._product._stock < 0:
            raise ValueError("Estoque não pode ser negativo")
        
    def create(self):
        try:
            self.validate_name()
            self.validate_description()
            self.validate_price()
            self.validate_stock()
            createdProduct = self._product.create()
            if createdProduct:
                return jsonify({"message": "Produto criado com sucesso", "status": True, "id": createdProduct}), 201
            else :
                return jsonify({"message": "Erro ao criar produto", "status": False}), 400
        except ValueError as e:
            return jsonify({"error": str(e), "status": False}), 500
        
    def readAll(self):
        try:
            products = self._product.readAll()
            if products:
                return jsonify({"message": "Produtos encontrados", "products": products, "status": True}), 200
            else:
                return jsonify({"message": "Nenhum produto encontrado", "status": False}), 404
        except ValueError as e:
            return jsonify({"error": str(e), "status": False}), 500
        
    def readById(self):
        try:
            res = self._product.readById()
            if res:
                return jsonify({"message": "Produto encontrado", "product": res, "status": True}), 200
            else:
                return jsonify({"message": "Produto não encontrado", "status": False}), 404
        except ValueError as e:
            return jsonify({"error": str(e), "status": False}), 500
        
    def update(self):
        try:
            self.validate_name()
            self.validate_description()
            self.validate_price()
            self.validate_stock()
            updatedProduct = self._product.update()
            if updatedProduct:
                return jsonify({"message": "Produto atualizado com sucesso", "status": True}), 200
            else:
                return jsonify({"message": "Erro ao atualizar produto", "status": False}), 400
        except ValueError as e:
            return jsonify({"error": str(e), "status": False}), 500
        
    def delete(self):
        try:
            deletedProduct = self._product.delete()
            if deletedProduct:
                return jsonify({"message": "Produto deletado com sucesso", "status": True}), 200
            else:
                return jsonify({"message": "Erro ao deletar produto", "status": False}), 400
        except ValueError as e:
            if str(e) == "Erro ao deletar produto":
                return jsonify({"message": "Não foi possível deletar o produto pois há um pedido relacionado com ele", "status": False}), 400
            return jsonify({"error": str(e), "status": False}), 500
        
    @property
    def product(self):
        return self._product
    
    @product.setter
    def product(self, product):
        self._product = product