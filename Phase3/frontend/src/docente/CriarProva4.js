import React from "react";
import NavbarDocente from "../componentes/NavbarDocente";
import { useNavigate,useLocation } from 'react-router-dom';


function CriarProva4() {
  var { alunos, salas, provaNome, data ,idProva, horaInicio, duracao} = useLocation().state;
  console.log(idProva)
  console.log(horaInicio)
  console.log(duracao)
  console.log(provaNome)
  console.log(data)
  console.log(alunos)
  console.log(salas)
  const history = useNavigate();
  const voltar = () => {
      history('/salas');
  }
  const continuar = (sala) => {
    history('/criarQuestao',{ state: { alunos, salas,provaNome,data,idProva, horaInicio, duracao } });
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
                                Versões
                            </h1>
                            <hr></hr>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 text-black">
                                <h1>Escolha a versão para adicionar questões.</h1>
                                <div>
                                  {salas.map((sala, index) => (
                                    <button
                                      key={index}
                                      type="button"
                                      className="rounded-md bg-primary px-7 text-sm font-semibold text-white shadow-sm btn d-flex align-items-center justify-content-center"
                                      onClick={() => continuar(sala)}
                                    >
                                      Versão {index+1} - Sala {sala}
                                    </button>
                                  ))}
                                </div>
                            </div>
                        </div>
                    </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button className="btn btn-sm btn-outline btn-error" type="button" 
                      onClick={voltar}
                  >
                      Voltar
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CriarProva4;
