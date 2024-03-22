import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import NavbarAluno from "../componentes/NavbarAluno";

function RealizarProva() {
  const history = useNavigate();
  const { classificacao_final, questoes } = useLocation().state;

  const voltar = () => {
    history('/provasAluno');
  }

  return (
    <>
      <NavbarAluno />
      <div className="hero min-h-screen bg-base-200">
        <div
          className="card w-1290 text-neutral-content rounded-lg bg-base-100 "
          style={{ width: "90%", marginTop: '100px' }}
        >
          <div className="card-body">
            <form>
              {questoes.map((questao, index) => (
                <div key={index} className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h1
                      className="text-base font-semibold leading-10 text-gray-900"
                      style={{ fontSize: "2rem" }}
                    >
                      Questão {index + 1}
                    </h1>
                    <div className="sm:col-span-4">
                    </div>
                    <br></br>
                    <hr></hr>
                    <hr></hr>
                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="col-span-full">
                        <label
                          htmlFor={`questao-${index + 1}`}
                          className="block text-md font-medium leading-10 text-gray-900"
                        >
                          Questão
                        </label>
                        <label
                          htmlFor={`questao-${index + 1}`}
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          {questao.enunciado}
                        </label>
                      </div>
                      <div className="col-span-full">
                        <label
                          htmlFor={`resposta-${index + 1}`}
                          className="block text-md font-medium text-gray-900"
                        >
                          Resposta
                        </label>
                        <div className="mt-2">
                          {questao.opcoes.map((opcao, opcaoIndex) => (
                            <label
                              key={opcaoIndex}
                              htmlFor={`opcao-${index + 1}-${opcaoIndex + 1}`}
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              {opcao.opcao}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <label className="text-black" style={{ color: 'oklch(var(--p))' }}>{`${questao.classificacao}/${questao.cotacao} valores`}</label>
                    <hr></hr>
                  </div>
                </div>
              ))}

              <div className="flex justify-between">
                <label
                  className="text-base text-md font-bold leading-10 text-gray-900"
                  style={{ fontSize: '22px' }}
                >
                  <label
                    className="text-base text-md font-bold leading-10 text-gray-900"
                    style={{ fontSize: '22px' }}
                  >
                    Classificação:
                  </label><span> </span>
                  {`${classificacao_final} valores`}
                </label>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    className="btn btn-sm btn-primary" type="button"
                    onClick={voltar}
                  >
                    Voltar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RealizarProva;
