import React from "react";
import { useNavigate } from 'react-router-dom';
import NavbarAluno from "../componentes/NavbarAluno";


function RealizarProva() {
  const history = useNavigate();
  const questao2 = () => {
    history('/realizarProva2');
  }
  const questao3 = () => {
    history('/realizarProva3');
  }
  const terminar = () => {
    history('/provasAluno');
  }

  return (
    <>
      <NavbarAluno />
      <div className="hero min-h-screen bg-base-200">
        <div
          className="card w-1290 text-neutral-content rounded-lg bg-base-100 "
          style={{ width: "90%" }}
        >
          <div className="card-body">
            <form>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h1
                    className="text-base font-semibold leading-10 text-gray-900"
                    style={{ fontSize: "2rem" }}
                  >
                    ASCN - Teste Teórico {/* ir buscar ao microserviço */}
                  </h1>
                  <div className="sm:col-span-4">
                  </div>
                  <br></br>
                  <hr></hr>
                  <hr></hr>
                  <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="questao"
                        className="block text-md font-medium leading-10 text-gray-900"
                      >
                        Questão 1
                      </label>
                      <label
                        htmlFor="questao"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        A complexidade da replicação de um serviço multi-camada não varia de acordo com o componente alvo (p.ex., servidor web, servidor aplicacional, base de dados)
                        a replicar. Indique e justifique se concorda ou não com esta afirmação.
                      </label>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="tipo"
                        className="block text-md font-medium leading-10 text-gray-900"
                      >
                        Resposta
                      </label>

                      <div className="mt-2">
                        <textarea
                          id="questao"
                          name="questao"
                          rows={3}
                          className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="join">
                  <input className="join-item btn btn-square btn-sm" type="radio" name="options" aria-label="1" checked />
                  <input className="join-item btn btn-square btn-sm" type="radio" name="options" aria-label="2" onClick={questao2} />
                  <input className="join-item btn btn-square btn-sm" type="radio" name="options" aria-label="3" onClick={questao3} />
                  <input className="join-item btn btn-square btn-sm" type="radio" name="options" aria-label="4" />
                </div>
                <div className="sm:col-span-4">
                  <div className="text-black flex gap-5">
                    <label>Tempo restante:</label>
                    <span className="countdown font-mono text-xl">
                      <span style={{ "--value": 10 }}></span>:
                      <span style={{ "--value": 24 }}></span>:
                      <span style={{ "--value": 52 }}></span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  className="btn btn-sm btn-primary" type="button"
                  onClick={terminar}
                >
                  Terminar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RealizarProva;