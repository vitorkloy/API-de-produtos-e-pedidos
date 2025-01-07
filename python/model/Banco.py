import mysql.connector
from mysql.connector import Error

class Banco:
    HOST = 'localhost'
    USER = 'root'
    PWD = ''
    DB = 'projeto_terceiro_bim'
    PORT = 3306
    CNN = None
    
    @staticmethod
    def connect():
        if Banco.CNN is None:
            try:
                
                Banco.CONEXAO = mysql.connector.connect(
                    host=Banco.HOST,
                    user=Banco.USER,
                    password=Banco.PWD,
                    database=Banco.DB,
                    port=Banco.PORT
                )
                Banco.CNN = Banco.CONEXAO
            except Error as err:
                obj_resposta = {
                    'cod': 1,
                    'msg': "Erro ao conectar no banco",
                    'erro': str(err)
                }
                print(obj_resposta) 
                exit(1) 

    @staticmethod
    def getConnection():
        if Banco.CNN is None:
            Banco.connect()
        return Banco.CNN

