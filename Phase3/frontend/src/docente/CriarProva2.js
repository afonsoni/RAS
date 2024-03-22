import React, { useState } from "react";
import NavbarDocente from "../componentes/NavbarDocente";
import { useNavigate, useLocation } from "react-router-dom";

function CriarProva2() {
  const { provaNome, fileContent } = useLocation().state;
  console.log(provaNome);
  console.log(fileContent);

  const history = useNavigate();
  const [provaData, setProvaData] = useState("");
  const [provaHoraHoras, setProvaHoraHoras] = useState("");
  const [provaHoraMinutos, setProvaHoraMinutos] = useState("");
  const [provaDuracao, setProvaDuracao] = useState("");
  const [provaID, setProvaID] = useState("");

  const voltar = () => {
    history("/criarProva");
  };

  const continuar = async () => {
    const data = provaData;
    const horaInicio = `${provaHoraHoras}:${provaHoraMinutos}`;
    const duracao = provaDuracao;
    const alunos = fileContent;

    // Fetch available salas based on the data, horaInicio, and duracao
    const salasResponse = await fetch(
      `http://localhost:7779/salas/disponiveisPAlunos/${fileContent.length}/${data}/${horaInicio}/${duracao}`
    );
    const salas = await salasResponse.json();
    const idProva = generateUUID(); // Use your existing function to generate a UUID
    // Update provaID state
    setProvaID(idProva);
    // Create the object for the POST request to localhost:7778/provas/
    const provaObject = {
      provas: [
        {
          id_prova: idProva, // Function to generate a unique ID
          nome: provaNome,
          id_docente: "docente",
          data: data,
          duracao: parseInt(duracao),
          hora: horaInicio,
          aleatorio: false,
          bloquear: false,
          alunos: fileContent,
          salas: salas.salasDisponiveis,
        },
      ],
    };

    // Make the POST request to localhost:7778/provas/
    const response = await fetch("http://localhost:7778/provas/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(provaObject),
    });

    // Check if the request was successful
    if (response.ok) {
      // Handle success, e.g., show a success message or navigate to the next page
      history("/salas", {
        state: { alunos, salas, provaNome, data, idProva, horaInicio, duracao },
      });
    } else {
      // Handle errors, e.g., show an error message
      console.error("Failed to create prova");
    }
  };

  const generateUUID = () => {
    // Function to generate a unique ID (for id_prova)
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : r & (0x3 | 0x8);
        return v.toString(16);
      }
    );
  };
  return (
    <>
      <NavbarDocente />
      <div className="hero min-h-screen bg-base-200">
        <div
          className="card shadow-xl w-1290 text-neutral-content rounded-lg bg-base-100 "
          style={{ width: "70%" }}
        >
          <div className="card-body">
            <form>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h1
                    className="text-base font-semibold leading-10 text-gray-900"
                    style={{ fontSize: "2rem" }}
                  >
                    Criar Prova
                  </h1>
                  <hr></hr>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="provaData"
                        className="block text-md font-medium leading-6 text-gray-900"
                      >
                        Data
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="date"
                            name="provaData"
                            id="provaData"
                            autoComplete="provaData"
                            value={provaData}
                            onChange={(e) => setProvaData(e.target.value)}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Nome da prova"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="provaHora"
                        className="block text-md font-medium leading-6 text-gray-900"
                      >
                        Hora
                      </label>
                      <div className="mt-1">
                        <div className="flex items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="provaHoraHoras"
                            id="provaHoraHoras"
                            autoComplete="provaHoraHoras"
                            value={provaHoraHoras}
                            onChange={(e) => setProvaHoraHoras(e.target.value)}
                            className="block w-1/2 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Horas"
                          />
                          <span
                            className="px-2"
                            style={{ color: "black", fontSize: "12px" }}
                          >
                            :{" "}
                          </span>
                          <input
                            type="text"
                            name="provaHoraMinutos"
                            id="provaHoraMinutos"
                            autoComplete="provaHoraMinutos"
                            value={provaHoraMinutos}
                            onChange={(e) =>
                              setProvaHoraMinutos(e.target.value)
                            }
                            className="block w-1/2 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Minutos"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="provaDuracao"
                        className="block text-md font-medium leading-6 text-gray-900"
                      >
                        Duração (minutos)
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="number"
                            name="provaDuracao"
                            id="provaDuracao"
                            autoComplete="provaDuracao"
                            value={provaDuracao}
                            onChange={(e) => setProvaDuracao(e.target.value)}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Duração da prova"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
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

export default CriarProva2;
