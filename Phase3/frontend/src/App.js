import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Login from './componentes/Login'
import RegistoAluno from './docente/RegistoAluno';
import RegistoAluno_Ind from './docente/RegistoAluno_Ind';
import RegistoAluno_File from './docente/RegistoAluno_File';
import CriarProva from './docente/CriarProva';
import CriarProva2 from './docente/CriarProva2';
import DisponibilidadeSalas from './docente/DisponibilidadeSalas';
import CriarProva4 from './docente/CriarProva4';
import CriarQuestao from './docente/CriarQuestao';
import Provas from './docente/ProvasDocente';
import Docente from './docente/Docente';
import Aluno from './aluno/Aluno';
import PerfilDocente from './docente/PerfilDocente';
import PerfilAluno from './aluno/PerfilAluno';
import EditarProva from './docente/EditarProva';
import EditarPerfilDocente from './docente/EditarPerfilDocente';
import Consultar from './docente/Consultar';
import Tecnico from './tecnico/Tecnico';
import GerirSalas from './tecnico/GerirSalas';
import RegistarDocente from './tecnico/RegistarDocente';
import RegistarDocente_Ind from './tecnico/RegistoDocente_Ind';
import RegistarDocente_File from './tecnico/RegistoDocente_File';
import AdicionarSalas from './tecnico/AdicionarSalas';
import RemoverSalas from './tecnico/RemoverSalas';
import ProvasAluno from './aluno/ProvasAluno';
import RealizarProva from './aluno/RealizarProva';
import RealizarProva2 from './aluno/RealizarProva2';
import RealizarProva3 from './aluno/RealizarProva3';
import ConsultarProva from './aluno/ConsultarProva';
import EditarPerfilA from './aluno/EditarPerfilA';
import NotificacoesA from './aluno/NotificacoesA';
import NotificacoesD from './docente/NotificacoesD';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/registoAluno" element={<RegistoAluno/>}/> 
          <Route path="/registoAlunoInd" element={<RegistoAluno_Ind/>}/> 
          <Route path="/registoAlunoFile" element={<RegistoAluno_File/>}/>          
          <Route path="/criarProva" element={<CriarProva/>}/>
          <Route path="/criarProva2" element={<CriarProva2/>}/>
          <Route path="/salas" element={<DisponibilidadeSalas/>}/>
          <Route path="/criarProva4" element={<CriarProva4/>}/>
          <Route path="/criarQuestao" element={<CriarQuestao/>}/>
          <Route path="/provasDocente" element={<Provas/>}/> 
          <Route path="/docente" element={<Docente/>}/>   
          <Route path="/aluno" element={<Aluno/>}/> 
          <Route path="/perfilDocente" element={<PerfilDocente/>}/>  
          <Route path="/perfilAluno" element={<PerfilAluno/>}/>  
          <Route path="/editar" element={<EditarPerfilDocente/>}/>
          <Route path="/editarProva" element={<EditarProva/>}/>
          <Route path="/consultar" element={<Consultar/>}/>
          <Route path='/tecnico' element={<Tecnico/>} />
          <Route path='/gerirSalas' element={<GerirSalas/>} />
          <Route path='/registoDocente' element={<RegistarDocente/>} />
          <Route path='/registoDocenteInd' element={<RegistarDocente_Ind/>} />
          <Route path='/registoDocenteFile' element={<RegistarDocente_File/>} />
          <Route path='/adicionarSalas' element={<AdicionarSalas/>} />
          <Route path='/removerSalas' element={<RemoverSalas/>} />
          <Route path='/provasAluno' element={<ProvasAluno/>} />
          <Route path='/realizarProva' element={<RealizarProva/>} />
          <Route path='/realizarProva2' element={<RealizarProva2/>} />
          <Route path='/realizarProva3' element={<RealizarProva3/>} />
          <Route path='/consultarProva' element={<ConsultarProva/>} />
          <Route path='/editarAluno' element = {<EditarPerfilA/>} />
          <Route path='/notificacoesA' element = {<NotificacoesA/>} />
          <Route path='/notificacoesD' element = {<NotificacoesD/>} />
      </Routes>
    </Router>
  );
}

export default App;
