import React, { useState, useEffect } from "react";
import NavbarAluno from "../componentes/NavbarAluno";
import { useNavigate } from "react-router-dom";
import Modal from "../componentes/Modal";
import axios from "axios";

function ProvasDocente() {
  const [showModal, setShowModal] = useState(false);
  const [provas, setProvas] = useState([]);

  useEffect(() => {
    // Fazer a solicitação para obter as provas do aluno
    axios
      .get("http://localhost:7778/provas/aluno/pg53895")
      .then((response) => {
        setProvas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter as provas do aluno:", error);
      });
  }, []);

  const history = useNavigate();
  const realizar = (id, nome) => {
    fetch(`http://localhost:7778/provas/${id}/versao/1/questoes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
        //console.log(response.body)
      })
      .then((questoes) => {
        console.log("Success:", questoes);
        const respostas = Array.from({ length: questoes.length }, () => null);
        
        history("/realizarProva2", {
          state: { questoes, indice: 0, respostas: respostas, nome, id },
        });

        // Navigate to the next version if it exists
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const consultar = (id, nome) => {
    fetch(`http://localhost:7778/provas/${id}/prova_realizada`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
        //console.log(response.body)
      })
      .then((classificacao) => {        
        history("/consultarProva", { state: { classificacao_final: classificacao.classificacao_final, questoes: classificacao.questoes },
        });

        // Navigate to the next version if it exists
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  
  return (
    <>
      <NavbarAluno />
      <div className="overflow-x-auto">
        <div className="overflow-x-auto">
          <div className="hero min-h-screen bg-base-200">
            <div
              className="card shadow-xl w-1290 text-neutral-content rounded-lg bg-base-100 "
              style={{ width: "70%", marginTop: "20px" }}
            >
              <div className="card-body justify-between" style={{}}>
                <h1
                  className="text-base font-semibold leading-10 text-gray-900"
                  style={{ fontSize: "1.5rem" }}
                >
                  Provas
                </h1>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Prova</th>
                    <th>Data</th>
                    <th>Estado</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="text-black rounded-md">
                  {provas.map((prova, index) => (
                    <tr key={prova.id_prova}>
                      <th>{index + 1}</th>
                      <td>{prova.nome}</td>
                      <td>{prova.data}</td>
                      <td>{prova.estado}</td>
                      <td className="mt-6 flex items-center justify-end gap-x-6">
                        {prova.estado === "REALIZAR" && (
                          <button
                            className="btn btn-sm"
                            type="button"
                            onClick={() => realizar(prova.id_prova, prova.nome)}
                          >
                            Realizar
                          </button>
                        )}
                        {prova.estado === "CORRIGIDA" && (
                          <button
                            className="btn btn-sm"
                            type="button"
                            onClick={() =>
                              consultar(prova.id_prova_realizada, prova.nome)
                            }
                          >
                            Consultar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProvasDocente;
