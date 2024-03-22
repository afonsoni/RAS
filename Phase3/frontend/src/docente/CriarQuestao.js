import React, { useState } from "react";
import NavbarDocente from "../componentes/NavbarDocente";
import { useNavigate, useLocation } from "react-router-dom";

function CriarQuestao() {
  var { alunos, salas, provaNome, data, idProva, horaInicio, duracao } =
    useLocation().state;
  console.log(idProva);
  const [tipoQuestao, setTipoQuestao] = useState("");
  const [questoes, setQuestoes] = useState([]);
  const [enunciado, setEnunciado] = useState("");

  const handleAdicionarQuestao = () => {
    // Assuming novaQuestao is an object in your state
    const novaQuestao = {
      id_questao: generateUUID(), // Use your method to generate a UUID
      enunciado: enunciado, // You may replace this with your dynamic content
      cotacao: 4,
      tipoQuestao: "EM",
      versao: 1,
      opcoes: [],
    };

    // Add options to novaQuestao.opcoes based on the input fields
    for (let index = 1; index < 5; index++) {
      const opcaoId = generateUUID();

      const opcaoConteudo = document.getElementById(
        `opt${index}Conteudo`
      ).value;
      const criterio = true; // Replace this with your logic for determining the criterion
      const cotacao_opcao = 1;

      // Push the option to novaQuestao.opcoes
      novaQuestao.opcoes.push({
        id_opcao: opcaoId,
        opcao: opcaoConteudo,
        criterio: criterio,
        cotacao: cotacao_opcao,
      });
    }

    // Add novaQuestao to the list of questions
    setQuestoes([...questoes, novaQuestao]);
  };

  const removerQuestao = (index) => {
    // Remove a questão no índice especificado
    const novasQuestoes = [...questoes];
    novasQuestoes.splice(index, 1);
    setQuestoes(novasQuestoes);
  };

  const history = useNavigate();
  const voltar = () => {
    history("/criarProva4");
  };

  const guardar = () => {
    // Now, trigger the notification creation
    console.log(alunos);
    console.log(data);
    console.log(horaInicio);
    console.log(salas);
    console.log(duracao);

    fetch("http://localhost:7432/notification/criaProva", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        numeroUtilizador: alunos,
        data: data,
        hora: horaInicio,
        salas: salas,
        duracao: duracao,
      }),
    })
      .then((response) => response.json())
      .then((notificationData) => {
        console.log("Notification created:", notificationData);
        // Optionally, you can update the state or perform any other actions based on the notification response
      })
      .catch((error) => {
        console.error("Error creating notification:", error);
      });

    // Log the structured questions for verification
    console.log(questoes);
    // Navigate to the next version if it exists
    // Send the structured questions to the specified endpoint (you need to implement this part)
    // Example using fetch:
    fetch(`http://localhost:7778/provas/${idProva}/versao/1/questoes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questoes),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        history("/docente");
        // Navigate to the next version if it exists
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    history("/docente");
  };

  // Helper function to generate a UUID (not fully RFC compliant)
  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  return (
    <>
      <NavbarDocente />
      <div className="hero min-h-screen bg-base-200">
        <div
          className="card w-1290 text-neutral-content rounded-lg bg-base-100 "
          style={{ marginTop: "50px", width: "70%" }}
        >
          <div className="card-body">
            <form>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h1
                    className="text-base font-semibold leading-10 text-gray-900"
                    style={{ fontSize: "2rem" }}
                  >
                    Prova: {provaNome}
                  </h1>
                  <br></br>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Data: {data}
                    </label>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    ></label>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Salas: {salas.sala}
                    </label>
                  </div>
                  <br></br>
                  <hr></hr>

                  {/* Questões adicionadas */}
                  {questoes.map((questao, index) => (
                    <React.Fragment key={index}>
                      <hr></hr>
                      <div className="relative mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                          <label className="block text-md font-medium leading-6 text-gray-900">
                            Questão nº {index + 1}
                          </label>
                          <div className="mt-2">
                            <p>{questao.conteudo}</p>
                          </div>
                        </div>
                        {/* Botão de remoção no canto superior direito */}
                        <div className="absolute top-0 right-0 mt-2 mr-2">
                          <button
                            type="button"
                            onClick={() => removerQuestao(index)}
                            className="rounded-md bg-secondary px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}

                  <hr></hr>
                  <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="questao"
                        className="block text-md font-medium leading-6 text-gray-900"
                      >
                        Questão
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="questao"
                          name="questao"
                          rows={3}
                          onChange={(e) => setEnunciado(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="tipo"
                        className="block text-md font-medium leading-6 text-gray-900"
                      >
                        Tipo
                      </label>
                      <select
                        className="select select-bordered w-full max-w-xs rounded-md"
                        style={{ color: "oklch(var(--s))" }}
                        onChange={(e) => setTipoQuestao(e.target.value)}
                      >
                        <option disabled selected>
                          Tipo de questão
                        </option>
                        <option value="Texto">Texto</option>
                        <option value="Escolha Múltipla">
                          Escolha Múltipla
                        </option>
                        <option value="V/F">V/F</option>
                      </select>
                    </div>

                    {/* Escolha Múltipla */}
                    {tipoQuestao === "Escolha Múltipla" && (
                      <div
                        className="mt-1 space-y-2"
                        style={{ width: "700px" }}
                      >
                        <label
                          htmlFor="opcoes"
                          className="inline-block text-md font-medium leading-6 text-gray-900"
                        >
                          Escolha Múltipla
                        </label>
                        {[1, 2, 3, 4].map((index) => (
                          <div
                            key={index}
                            className="flex w-full items-center gap-x-3"
                          >
                            <input
                              id={`opt${index}`}
                              name="opcoes"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor={`opt${index}Conteudo`}
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                  type="text"
                                  name={`opt${index}Conteudo`}
                                  id={`opt${index}Conteudo`}
                                  autoComplete={`opt${index}Conteudo`}
                                  className="block flex w-full border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  style={{ width: "30vw" }}
                                  placeholder={`Opção ${index}`}
                                />
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Verdadeiro/Falso */}
                    {tipoQuestao === "V/F" && (
                      <div className="mt-1 space-y-2">
                        <div className="indicator">
                          <label
                            htmlFor="v_f"
                            className="block text-md font-medium leading-6 text-gray-900"
                          >
                            Verdadeiro/Falso
                          </label>
                          <span className="indicator-item indicator-middle badge badge-secondary info">
                            i
                          </span>
                        </div>
                        {[1, 2, 3, 4].map((index) => (
                          <div
                            key={index}
                            className="flex items-center gap-x-3"
                          >
                            <div className="form-control w-10">
                              <label className="cursor-pointer label">
                                <input
                                  type="checkbox"
                                  className="toggle toggle-primary toggle-sm"
                                  selected
                                />
                              </label>
                            </div>
                            <label
                              htmlFor={`opt${index}`}
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                  type="text"
                                  name={`opt${index}Conteudo`}
                                  id={`opt${index}Conteudo`}
                                  autoComplete={`opt${index}Conteudo`}
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  style={{ width: "50wv" }}
                                  placeholder={`Afirmação ${index}`}
                                />
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    style={{ marginTop: "30px" }}
                    onClick={handleAdicionarQuestao}
                  >
                    Adicionar
                  </button>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  className="btn btn-sm btn-outline btn-error"
                  type="button"
                  onClick={voltar}
                >
                  Voltar
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  type="button"
                  onClick={guardar}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CriarQuestao;
