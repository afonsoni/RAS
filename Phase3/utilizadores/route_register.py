from settings import *
from insert   import *
from ucs      import *
from update   import *


import json


# http://127.0.0.1:5000/getResgistoDocenteForm
@app.route('/getResgistoDocenteForm', methods=['GET'])
def getResgistoDocenteForm():
    dict = {'id': None, 'name': None, 'email': None, 'password': None, 'type': 2, 'attends': None, 'gives': None}
    return jsonify(dict)

# http://127.0.0.1:5000/getResgistoAlunoForm
@app.route('/getResgistoAlunoForm', methods=['GET'])
def getResgistoAlunoForm():
    dict = {'id': None, 'name': None, 'email': None, 'password': None, 'type': 1, 'attends': None, 'gives': None}
    return jsonify(dict)


# http://127.0.0.1:5000/getResgistoGestorForm
@app.route('/getResgistoGestorForm', methods=['GET'])
def getResgistoGestorForm():
    dict = {'id': None, 'name': None, 'email': None, 'password': None, 'type': 3, 'attends': None, 'gives': None}
    return jsonify(dict)




# http://127.0.0.1:5000/registarAluno?id=a99549&name=Marta&password=novapass&email=email@hotmail.com
@app.route('/registarAluno', methods=['GET'])
def registaAluno():
    id       = request.args.get    ('id'      , type=str)
    name     = request.args.get    ('name'    , type=str)
    password = request.args.get    ('password', type=str)
    email    = request.args.get    ('email'   , type=str)
    type     = 1 #request.args.get    ('type'    , type=int)
    attends  = request.args.getlist('attends'           )
    gives    = request.args.getlist('gives'             )

    gives_values   = [int(x) for x in gives]
    attends_values = [int(x) for x in attends]

    if id is None or password is None or name is None or email is None or type is None:
        return jsonify(error="Missing parameter"), 400
    try:
        print(gives_values, attends_values)
        insert_user(id, name, email,  password, type, attends_values, gives_values)
        return jsonify({})
    except:
        return jsonify(error="An exception occurred while inserting into the database"), 500




# http://127.0.0.1:5000/registarDocente?id=a9129&name=Marta&password=novapass&email=email@hotmail.com

@app.route('/registarDocente', methods=['GET'])
def registaDocente():
    id       = request.args.get    ('id'      , type=str)
    name     = request.args.get    ('name'    , type=str)
    password = request.args.get    ('password', type=str)
    email    = request.args.get    ('email'   , type=str)
    type     = 2 #request.args.get    ('type'    , type=int)
    attends  = request.args.getlist('attends'           )
    gives    = request.args.getlist('gives'             )

    gives_values   = [int(x) for x in gives]
    attends_values = [int(x) for x in attends]

    if id is None or password is None or name is None or email is None or type is None:
        return jsonify(error="Missing parameter"), 400
    try:
        print(gives_values, attends_values)
        insert_user(id, name, email,  password, type, attends_values, gives_values)
        return jsonify({})
    except:
        return jsonify(error="An exception occurred while inserting into the database"), 500



# http://127.0.0.1:5000/registarGestor?id=a9959&name=Marta2&password=novapas2s&email=email3@hotmail.com
@app.route('/registarGestor', methods=['GET'])
def registaGestor():
    id       = request.args.get    ('id'      , type=str)
    name     = request.args.get    ('name'    , type=str)
    password = request.args.get    ('password', type=str)
    email    = request.args.get    ('email'   , type=str)
    type     = 3 #request.args.get    ('type'    , type=int)
    attends  = request.args.getlist('attends'           )
    gives    = request.args.getlist('gives'             )

    gives_values   = [int(x) for x in gives]
    attends_values = [int(x) for x in attends]

    if id is None or password is None or name is None or email is None or type is None:
        return jsonify(error="Missing parameter"), 400
    try:
        print(gives_values, attends_values)
        insert_user(id, name, email,  password, type, attends_values, gives_values)
        return jsonify({})
    except:
        return jsonify(error="An exception occurred while inserting into the database"), 500



# http://127.0.0.1:5000/registarLista
@app.route('/registarLista', methods=['POST'])
def registaAlunoLista():
    try:
        for _, file in request.files.items():
            content = file.stream.read()
            data = json.loads(content.decode('utf-8'))
            for student in data:
                insert_user_dic(student)
            return jsonify({})

    except Exception as e:
        print(str(e))
        return jsonify(error="An exception occurred while processing the file"), 500
