from settings import *

def getUc_docente(user_id):
    query = 'SELECT * FROM docente WHERE id = ?'
    ucs   = conn.execute(query, (user_id,)).fetchall()
    all_uc = []
    if ucs:
        for _,uc_id in ucs:
            all_uc.append(uc_id)
        all_descriptions = []
        for uc_id in all_uc:
            all_descriptions.append(getUc(uc_id))

        return all_descriptions
    else:
        print(f'USER {user_id} not found in "docente"')
        return None


def getUc_aluno(user_id):
    query = 'SELECT * FROM aluno WHERE id = ?'
    ucs   = conn.execute(query, (user_id,)).fetchall()
    all_uc = []
    if ucs != None:
        for _,uc_id in ucs:
            all_uc.append(uc_id)
        all_descriptions = []
        for uc_id in all_uc:
            all_descriptions.append(getUc(uc_id))

        return all_descriptions
    else:
        print(f'USER {user_id} not found in "aluno"')
        return None

def getUc(uc_id):
    'Return the description of a specific uc'
    query = 'SELECT * FROM uc WHERE n = ?'
    uc = conn.execute(query, (uc_id,)).fetchone()
    if uc:
        return uc[1]
    else:
        print(f'UC {uc_id} not found')
        return None



def getUc_description(uc_des):
    'Return the number of a uc from a description'

    query = 'SELECT n FROM uc WHERE description = ?'
    uc = conn.execute(query, ( uc_des,)).fetchone()
    if uc:
        return uc[0]
    else:
        print(f'UC {uc_des} not found')
        return None



def getPerfil(user_id):
    "Return all the information of a user"
    query = "SELECT * FROM utilizador WHERE id = ?"
    user = conn.execute(query, (user_id,)).fetchone()

    if user != None:
        id,name,email,password,type_user = user
        dic = dict()
        dic["id"]        = id
        dic["name"]      = name
        dic["email"]     = email
        dic["password"]  = password
        dic["type"]      = type_user
        dic["attends"] = getUc_aluno(id)
        dic["gives"] = getUc_docente(id)
        return dic
    else:
        print(f'USER {user_id} not found')
        return None



def all_users():
    'Returns information from all the us'
    users = conn.execute('SELECT id from utilizador').fetchall()
    all = []
    if users:
        for id,*_ in users:
            all.append( getPerfil(id))
        return all
    else:
        return None




def getPassword_byid(user_id):
    'Return the password from a user'

    query = 'SELECT password FROM utilizador  WHERE id = ?'
    user = conn.execute(query, ( user_id,)).fetchone()
    if user != None:
        password = user[0]
        return password
    else:
        print(f'User {user_id} not found')
        return None

def getTypeId(user_id):
    'Return the type from a user'

    query = 'SELECT type FROM utilizador  WHERE id = ?'
    user = conn.execute(query, ( user_id,)).fetchone()
    if user != None:
        password = user[0]
        return password
    else:
        print(f'User {user_id} not found')
        return None

def getTypeEmail(user_email):
    'Return the type from a user'
    query = 'SELECT type FROM utilizador  WHERE email = ?'
    user = conn.execute(query, ( user_email,)).fetchone()
    if user != None:
        password = user[0]
        return password
    else:
        print(f'User {user_email} not found')
        return None



def getPassword_byemail(user_email):
    'Return the password from a user'

    query = 'SELECT password FROM utilizador  WHERE email = ?'
    user = conn.execute(query, ( user_email,)).fetchone()
    if user != None:
        password = user[0]
        return password
    else:
        print(f'User {user_id} not found')
        return None
