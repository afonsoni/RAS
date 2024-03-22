import React, { useState, useEffect } from "react";
import NavbarDocente from "../componentes/NavbarDocente";
import { useNavigate } from "react-router-dom";
import Modal from "../componentes/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProvasDocente() {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const history = useNavigate();
  const handleClick = () => {
    history("/consultar");
  };

  const userId = "docente";

  const [provas, setProvas] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:7778/provas/docente/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setProvas(data));
  }, []);

  const [corrigir, setCorrigir] = useState([]);
  const handleCorrigir = () => {
    fetch(`http://localhost:7778/provas/${userId}/corrigir_todas`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {setCorrigir(data);console.log(data);toast.success("Classificação automática efetuada com sucesso!")});
  };

  const partilhar = () => {
    setShowModal(false);
    toast.success("Partilhado com sucesso!");
  };

  return (
    <>
      <NavbarDocente />
      <div className="overflow-x-auto">
        <div className="overflow-x-auto">
          <div className="hero  min-h-screen bg-base-200">
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
                <button
                  className="btn btn-md btn-secondary"
                  style={{
                    width: "120px",
                    lineHeight: "20px",
                    alignContent: "center",
                  }}
                  onClick={handleCorrigir}
                >
                  Classificação Automática
                </button>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Prova</th>
                    <th>Data</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="text-black rounded-md">
                  {Array.isArray(provas) &&
                    provas.map((prova, index) => (
                      <React.Fragment key={index}>
                        <tr>
                          <th>{index + 1}</th>
                          <td>{prova.nome}</td>
                          <td>{prova.data}</td>
                          <td className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => setShowModal2(true)}
                            >
                              Publicar Classificações
                            </button>
                            <button
                              className="btn btn-sm btn-accent"
                              onClick={() => setShowModal(true)}
                            >
                              Partilhar
                            </button>
                            <button
                              className="btn btn-sm"
                              type="button"
                              onClick={handleClick}
                            >
                              Consultar
                            </button>
                          </td>
                        </tr>
                        <hr></hr>
                      </React.Fragment>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal isVisable={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6">
          <h2 className="card-title text-lg font-semibold mt-4">Partilhar</h2>
          <div className="divider my-4"></div>
          <input
            type="text"
            placeholder="Email"
            className="input input-xs input-bordered w-full max-w-xs"
          />

          <div className="flex justify-center mt-4">
            <button
              className="btn btn-sm btn-outline btn-error mr-4"
              type="button"
            >
              Cancelar
            </button>
            <button
              className="btn btn-sm btn-primary"
              type="button"
              onClick={partilhar}
            >
              Partilhar
              <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </button>
          </div>
        </div>
      </Modal>
      <Modal isVisable={showModal2} onClose={() => setShowModal2(false)}>
        <div className="p-6">
          <h2 className="card-title text-lg font-semibold mt-4">
            Publicar Classificações prova {provas.nome}
          </h2>

          <div className="flex justify-center mt-4">
            <button
              className="btn btn-sm btn-outline btn-error mr-4"
              type="button"
            >
              Cancelar
            </button>
            <button
              className="btn btn-sm btn-primary"
              ype="button"
              onClick={partilhar}
            >
              Partilhar
              <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ProvasDocente;
