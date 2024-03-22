import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarAluno from "../componentes/NavbarAluno";


function RealizarProva2() {

  var {questoes,indice,respostas, nome, id} = useLocation().state;
  console.log(id);
  
  console.log(questoes)
  const history = useNavigate();

  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [questaoSelecionada, setQuestaoSelecionada] = useState(0);

  useEffect(() => {
    const opcaoSelecionada = respostas[indice]?.opcoes.find((opcao) => opcao.resposta_utilizador === 'true');
    setRespostaSelecionada(opcaoSelecionada || null);

  }, [indice, respostas]);


  const questao = (indice) => {
    setQuestaoSelecionada(indice);
    history('/realizarProva2', { state: { questoes, indice: indice, respostas, id} });
  }

  const selecionarResposta = (opcao, opcoes) => {
    setRespostaSelecionada(opcao);
  
    // Define resposta_utilizador para false em todas as opções
    opcoes.forEach((opcao) => {
      opcao.resposta_utilizador = "false";
    });
  
    // Define resposta_utilizador para true na opção selecionada
    opcao.resposta_utilizador = "true";
  
    respostas[indice] = {
      id_questao: questoes[indice].id,
      opcoes: questoes[indice].opcoes.map((opcao, j) => ({
        id_opcao: opcao.idopcao,
        resposta_utilizador: opcao.resposta_utilizador
      }))
    };
  
  };
  
  const terminar = () => {

    const idProva = id; 
    const numAluno = "pg53895"; 

    fetch(`http://localhost:7778/provas/${idProva}/responder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        numAluno: numAluno,
        respostas: respostas,
      }),
    })
    .then(response => response.json())
    .then(data => {
    
      console.log('Respostas enviadas com sucesso:', data);
      history('/provasAluno');
    })
    .catch((error) => {
      console.error('Erro ao enviar respostas:', error);
    });
  }

  return (
    <>
      <NavbarAluno />
      <div className="hero min-h-screen bg-base-200">
        <div
          className="card w-1290 text-neutral-content rounded-lg bg-base-100 "
          style={{width: "90%" }}
        >
          <div className="card-body">
            <form>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h1
                    className="text-base font-semibold leading-10 text-gray-900"
                    style={{ fontSize: "2rem" }}
                  >
                   {nome} {/* ir buscar ao microserviço */}
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
                        Questão {indice + 1}
                      </label>
                      <label
                        htmlFor="questao"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                      {questoes[indice].enunciado}

                      </label>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="tipo"
                        className="block text-md font-medium leading-10 text-gray-900"
                      >
                        Resposta
                      </label>
              
                    {/* Escolha Múltipla */}
                    {/* {tipoQuestao === "Escolha Múltipla" && ( */}
                      <div
                        className="mt-1 space-y-2"
                        style={{ width: "700px" }}
                      >
                        {questoes[indice].opcoes.map((opcao, index) => (
                          <div key={index} className="flex w-full items-center gap-x-3">
                            <input
                              id={opcao.idopcao}
                              name="opcoes"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              checked={
                                respostas[indice] && respostas[indice].opcoes.some(
                                  (rOpcao) => rOpcao.resposta_utilizador === "true" && rOpcao.id_opcao === opcao.idopcao
                                )
                              }
                              onChange={() => selecionarResposta(opcao, questoes[indice].opcoes)}
                            />
                            <label
                              htmlFor={`opt${index}Conteudo`}
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              <div className="flex focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <label>{opcao.opcao} </label>
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    {/* )} */}

                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">

                <div className="join">
                  {questoes.map((_, i) => (
                    <input
                      key={i}
                      className="join-item btn btn-square btn-sm"
                      type="radio"
                      name="options"
                      aria-label={i + 1}
                      checked={questaoSelecionada === i}
                      onClick={() => questao(i)}
                    />
                  ))}
                </div>                   
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    className="btn btn-primary btn-sm" type="button"
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

export default RealizarProva2;