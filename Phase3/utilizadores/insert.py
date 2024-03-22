from settings import *
from ucs      import *


def insert_user_dic(dic):
    if dic['type'] == None:
        if dic['attends'] != [] and dic['gives'] != []:
            dic['type'] == 3
        if dic['attends'] != []:
            dic['type'] == 1
        if dic['gives'] != []:
            dic['type'] == 2
    if dic['attends'] == None:
        dic['attends'] = []
    if dic['gives'] == None:
        dic['gives'] = []
    try:
        insert_user(dic['id'], dic['name'], dic['email'], dic['password'],dic['type'], dic['attends'], dic['gives'])
    except:
        print(f'USER {dic["id"]} can\'t be inserted')


def insert_aluno(id, uc_id):
    "Inserts into aluno a pair of it's id and uc: a95191 3 or can be the full written name"
    query = 'INSERT INTO aluno (id, uc_attends) VALUES (?, ?)'
    try:
        if type(uc_id) == type('str'):
            uc_id = getUc_description(uc_id)

        conn.execute(query,(id, uc_id))

    # Commit the changes to the database
        conn.commit()
    except:
        pass


def insert_docente(id, uc_id):
    query = 'INSERT INTO docente (id, uc_gives) VALUES (?, ?)'
    try:
        if type(uc_id) == type('str'):
            uc_id = getUc_description(uc_id)
        conn.execute(query,(id, uc_id))
        conn.commit()
    except:
        pass



def insert_user(id, name, email, password, user_type, attends=[], gives=[]):
    query = 'INSERT INTO utilizador (id, name, email, password, type) VALUES (?, ?, ?, ?, ?)'
    try:
        conn.execute(query,(id, name, email, password, user_type))
        conn.commit()
   
    except Exception as e:
        print(f"Error inserting user: {e}")

    # type 1 → utilizador académico
    #if   user_type == 1:
    for uc_attended in attends:
        insert_aluno(id,uc_attended)
    # type 2 → utilizador docente
    #elif user_type == 2:
    for uc_given in gives:
        insert_docente(id,uc_given)
    # type 3 → gestor
    #elif user_type == 3: