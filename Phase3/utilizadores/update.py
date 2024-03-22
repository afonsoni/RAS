from settings import *


def updateEmail(user_id,new_email):
    query = 'UPDATE utilizador SET email = ? WHERE id = ?'
    conn.execute(query , (new_email, user_id))

    conn.commit()


def updatePassword(user_id,new_password):
    query = 'UPDATE utilizador SET password = ? WHERE id = ?'
    conn.execute(query , (new_password, user_id))

    conn.commit()