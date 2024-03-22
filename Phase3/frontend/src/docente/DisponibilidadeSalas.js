import React from "react";
import NavbarDocente from "../componentes/NavbarDocente";
import { useNavigate,useLocation } from 'react-router-dom';


function DisponibilidadeSalas() {
  var { alunos,salas,provaNome,data,idProva, horaInicio, duracao } = useLocation().state;
  const history = useNavigate();
  salas = salas.salasDisponiveis;
  const voltar = () => {
      history('/criarProva2');
  }
  const continuar = () => {
    history('/criarProva4', { state: { alunos,salas,provaNome,data,idProva, horaInicio, duracao } });
  }
    return (
        <><NavbarDocente />
        <div className="hero min-h-screen bg-base-200">
            <div className="card shadow-xl w-1290 text-neutral-content rounded-lg bg-base-100 " style={{width: '70%'}}>
                <div className="card-body">
                <form> 
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h1 className="text-base font-semibold leading-10 text-gray-900" style={{ fontSize: '2rem' }}>
                                Salas disponíveis
                            </h1>
                            <hr></hr>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 text-black">
                              <h1>Complexo Pedagógico 1 - {salas.join(', ')}</h1>
                            </div>
                        </div>
                    </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button className="btn btn-sm btn-outline btn-error" type="button" 
                        onClick={voltar}
                    >
                        Voltar
                    </button>
                    <button 
                        className="btn btn-sm btn-secondary" type="button"
                    >
                        Alterar
                    </button>
                    <button
                        className="btn btn-sm btn-primary" type="button"
                        onClick={continuar}
                        >
                        Continuar
                    </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default DisponibilidadeSalas;
