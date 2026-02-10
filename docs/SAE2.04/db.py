import mysql.connector
from mysql.connector import errorcode
import os

def ensure_capteur_exists(maison, piece, id_capteur):
    db_config = {
        "host": "10.252.18.139",
        "user": "toto",
        "password": "123456789toto**",
        "database": "test",
    }
    cnx = mysql.connector.connect(**db_config)
    cursor = cnx.cursor()
    cursor.execute("SELECT id FROM CAPTEUR WHERE id_capteur = %s", (id_capteur,))
    result = cursor.fetchone()
    print(result)
    if result is None:
       
        insert_capteur_query = """
        INSERT INTO CAPTEUR (maison, piece, id_capteur)
        VALUES (%s, %s, %s)
        """
        cursor.execute(insert_capteur_query, (maison, piece, id_capteur))
        cnx.commit()
        print(f"Capteur inséré : {maison}, {piece}, {id_capteur}")

        cursor.execute("SELECT id FROM CAPTEUR WHERE id_capteur = %s", (id_capteur,))
        result = cursor.fetchone()
        print(result[0])
        return result[0]
    else:
        print(f"Capteur existe déjà : {id_capteur}")
    cnx.commit()
    cursor.close()
    cnx.close()
    return result[0]


def insert_into_db(id_capteur, date, time, temperature):
    db_config = {
        "host": "10.252.18.139",
        "user": "toto",
        "password": "123456789toto**",
        "database": "test",
    }
    cnx = mysql.connector.connect(**db_config)
    cursor = cnx.cursor()

    insert_donnees_query = """
           INSERT INTO DONNEE (date, heure, temperature, id_capteur_id)
           VALUES (%s, %s, %s, %s)
           """
    cursor.execute(insert_donnees_query, (date, time, temperature, id_capteur))
    cnx.commit()
    cursor.close()
    cnx.close()
    print(f"Données insérées : {id_capteur}, {date}, {time}, {temperature}")
