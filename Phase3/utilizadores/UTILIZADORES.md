# Autenticação 
http://127.0.0.1:5000/autenticaEmail?email=joaoafonsoalvim@gmail.com&password=12356789
Autenticação com email. Route with a 2 arguments 'email' and 'password'

http://127.0.0.1:5000/autenticaId?id=a95191&password=12356789
Se preferirem com o id,  Route with a 2 arguments 'id' ans 'password'

retornam um json um dicionário com o type: 1,2 ou 3, ex: {'type':3}
type 1 → utilizador académico
type 2 → utilizador docente
type 3 → utilizador gestor


# Registos
http://127.0.0.1:5000/getResgistoGestorForm
http://127.0.0.1:5000/getResgistoAlunoForm
http://127.0.0.1:5000/getResgistoDocenteForm
Rotas que devolvem um json com cenas para preencher, no vosso caso preencham só o nome password e id, o resto podem deixar como tiver ou em None.    é qualquer coisa deste género: {'id': None, 'name': None, 'email': None, 'password': None, 'type': 1, 'attends': None, 'gives': None}

http://127.0.0.1:5000/registarAluno?id=a99999&name=Marta&password=novapass&email=email@hotmail.com
forma de registar um aluno com , id , name, password, emial, type como argumentos

para docentes
http://127.0.0.1:5000/registarDocente?id=a9129&name=Marta&password=novapass&email=email@hotmail.com

para gestores
http://127.0.0.1:5000/registarGestor?id=a9959&name=Marta2&password=novapas2s&email=email2@hotmail.com

http://127.0.0.1:5000/registarLista
tem que enviar um ficheiro json com uma lista de dicionários como o que está em cima. Regista Docentes Alunos qualquer coisa que tenha nessa lista

# Perfil
http://127.0.0.1:5000/getPerfil?id=a95191
Route with a single argument 'id'

# Editar cenas
http://127.0.0.1:5000/editarPassword?id=a95191&password=novapass
Route with a 2 arguments 'id' ans 'password'

http://127.0.0.1:5000/editarEmail?id=a95191&email=emailfixe@gmail.com
Route with a 2 arguments 'id' ans 'email' (novo email)


# debug
http://127.0.0.1:5000/getAll
Lista de todos os utilizadores
