from model.Banco import Banco
from mysql.connector import Error

class Products:
    def __init__(self):
        self._id = None
        self._name = None
        self._description = None
        self._price = None
        self._stock = None
    
    def create(self):
        cnx = Banco.getConnection()
        if cnx:
            try:
                cursor = cnx.cursor()
                sql = "INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (%s, %s, %s, %s)"
                
                cursor.execute(sql, (self._name, self._description, self._price, self._stock))
                cnx.commit()
                self._id = cursor.lastrowid
                cursor.close()
                return self._id
            except Error as e:
                cursor.close()
                print(f"Erro ao criar produto: {e}")
                raise ValueError("Erro ao criar produto")

    def readAll(self):
        cnx = Banco.getConnection()
        if cnx:
            try:
                cursor = cnx.cursor(dictionary=True)
                sql = "SELECT * FROM produtos"
                cursor.execute(sql)
                products = cursor.fetchall()
                cursor.close()
                return products
            except Error as e:
                cursor.close()
                print(f"Erro ao ler produtos: {e}")
                raise ValueError("Erro ao ler produtos")

    def readById(self):
        cnx = Banco.getConnection()
        try:
            cursor = cnx.cursor(dictionary=True)
            sql = "SELECT * FROM produtos WHERE id = %s"
            cursor.execute(sql, (self._id,))
            res = cursor.fetchone()
            if res:
                self._id = res["id"]
                self._name = res["nome"]
                self._description = res["descricao"]
                self._price = res["preco"]
                self._stock = res["estoque"]
            cursor.close()
            return res
        except Error as e:
            print(f"Erro ao ler produto: {e}")
            cursor.close()
            return None
            

    def update(self):
        cnx = Banco.getConnection()
        try:
            cursor = cnx.cursor()
            sql = "UPDATE produtos SET nome = %s, descricao = %s, preco = %s, estoque = %s WHERE id = %s"
            cursor.execute(sql, (self._name, self._description, self._price, self._stock, self._id))
            cnx.commit()
            cursor.close()
            return cursor.rowcount
        except Error as e:
            cursor.close()
            print(f"Erro ao atualizar produto: {e}")
            raise ValueError("Erro ao atualizar produto")

    def delete(self):
        cnx = Banco.getConnection()
        try:
            cursor = cnx.cursor()
            sql = "DELETE FROM produtos WHERE id = %s"
            cursor.execute(sql, (self._id,))
            cnx.commit()
            cursor.close()
            return cursor.rowcount
        except Error as e:
            cursor.close()
            print(f"Erro ao deletar produto: {e}")
            raise ValueError("Erro ao deletar produto")

    @property
    def id(self):
        return self._id
    
    @id.setter
    def id(self, id):
        self._id = id

    @property
    def name(self):
        return self._name
    
    @name.setter
    def name(self, name):
        self._name = name

    @property
    def description(self):
        return self._description
    
    @description.setter
    def description(self, description):
        self._description = description

    @property
    def price(self):
        return self._price
    
    @price.setter
    def price(self, price):
        self._price = price

    @property
    def stock(self):
        return self._stock
    
    @stock.setter
    def stock(self, stock):
        self._stock = stock