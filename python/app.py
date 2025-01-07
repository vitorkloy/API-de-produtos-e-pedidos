from flask import Flask, jsonify, request
from controller.ProductController import ProductController
from model.Products import Products

app = Flask("api")

def handleError(e):
    return jsonify({"error": str(e)}), 400

@app.route("/produtos/", methods=["GET"])
def readAll():
    try:
        productController = ProductController()
        
        return productController.readAll()
    except Exception as e:
        return handleError(e)
    
@app.route("/produtos/", methods=["POST"])
def create():
    try:
        body = request.get_json()
        productController = ProductController()
        
        productController._product._name = body["nome"]
        productController._product._description = body["descricao"]
        productController._product._price = body["preco"]
        productController._product._stock = body["estoque"]
        
        return productController.create()
    except Exception as e:
        return handleError(e)
    
@app.route("/produtos/<int:id>/", methods=["GET"])
def readById(id):
    try:
        productController = ProductController()
        
        productController._product._id = id
        
        return productController.readById()
    except Exception as e:
        return handleError(e)
    
@app.route("/produtos/<int:id>/", methods=["PUT"])
def update(id):
    try:
        body = request.get_json()
        productController = ProductController()
        
        productController._product._id = id
        productController._product._name = body["nome"]
        productController._product._description = body["descricao"]
        productController._product._price = body["preco"]
        productController._product._stock = body["estoque"]
        
        return productController.update()
    except Exception as e:
        return handleError(e)
    
@app.route("/produtos/<int:id>/", methods=["DELETE"])
def delete(id):
    try:
        productController = ProductController()
        
        productController._product._id = id
        
        return productController.delete()
    except Exception as e:
        return handleError(e)
app.run(host="0.0.0.0", port=8080, debug=True)