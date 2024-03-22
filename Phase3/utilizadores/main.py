#!/usr/bin/python


from settings       import *
from insert         import *
from ucs            import *
from update         import *
from route_register import *

k = {'id': 'a12345', 'name': 'JNO', 'email': 'JNO@gmail.com', 'password': 'correctinside', 'type': 3, 'attends': None, 'gives': ['Desenvolvimento de Aplicações']}
insert_user_dic(k)


# http://127.0.0.1:5000/getPerfil?id=a95191
# Route with a single argument 'id'
@app.route('/getPerfil', methods=['GET'])
def getPerfil_r():
    id = request.args.get('id', type=str)
    if id is None:
        return jsonify(error="Missing 'id' parameter"), 400
    try:
        result = getPerfil(id)
        return jsonify(result)
    except:
        return jsonify(error="An exception occurred"), 500
    


# http://127.0.0.1:5000/editarEmail?id=a95191&email=emailfixe@gmail.com
# Route with a 2 arguments 'id' ans 'email'
@app.route('/editarEmail', methods=['GET','POST'])
def editarEmail_r():
    id = request.args.get('id', type=str)
    email = request.args.get('email', type=str)

    if id is None or email is None:
        return jsonify(error="Missing parameter"), 400
    try:
        updateEmail(id,email)
        return jsonify({})
    except:
        return jsonify(error="An exception occurred"), 500


# http://127.0.0.1:5000/editarPassword?id=a95191&password=novapass
# Route with a 2 arguments 'id' ans 'password'
@app.route('/editarPassword', methods=['GET','POST'])
def editarPassword_r():
    id = request.args.get('id', type=str)
    password = request.args.get('password', type=str)

    if id is None or password is None:
        return jsonify(error="Missing parameter"), 400
    try:
        updatePassword(id,password)
        return jsonify({})
    except:
        return jsonify(error="An exception occurred"), 500


# http://127.0.0.1:5000/autenticaId?id=a95191&password=12356789
# Route with a 2 arguments 'id' ans 'password'
@app.route('/autenticaId', methods=['GET'])
def autentica_id():
    id = request.args.get('id', type=str)
    password = request.args.get('password', type=str)

    if id is None or password is None:
        return jsonify(error="Missing parameter"), 400
    try:
        real_password = getPassword_byid(id)
        if real_password == password:
            t = getTypeId(id)
            return jsonify({'type':t})
        else: 
            return jsonify(error="Wrong password"), 500
    except:
        return jsonify(error="An exception occurred"), 500



# http://127.0.0.1:5000/autenticaEmail?email=joaoafonsoalvim@gmail.com&password=12356789
# Route with a 2 arguments 'email' and 'password'
@app.route('/autenticaEmail', methods=['GET'])
def autentica_email():
    email = request.args.get('email', type=str)
    password = request.args.get('password', type=str)

    if email is None or password is None:
        return jsonify(error="Missing parameter"), 400
    try:
        real_password = getPassword_byemail(email)
        if real_password == password:
            t = getTypeEmail(email)
            return jsonify({'type':t})
        else: 
            return jsonify(error="Wrong password"), 500
    except:
        return jsonify(error="An exception occurred"), 500



# http://127.0.0.1:5000/getAll
@app.route('/getAll', methods=['GET'])
def getAll():
    return jsonify(all_users())





if __name__ == '__main__':
    app.run(debug=True)

    print("Desconnecting from database")
    conn.close() 

conn.close()