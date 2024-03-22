import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import NavbarAluno from '../componentes/NavbarAluno';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EditarPerfilA() {
    const notify = () => toast("*notificação x*");
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const history = useNavigate();
    const handleClick = () => {
      history('/editarAluno');
  }
    return (
        <>
        <NavbarAluno/>
        <div className="hero min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card w-96 bg-base-100 shadow-xl rounded-md p-6" style={{ width: '70%' }}>
                <div className="card-body text-center">
                    <h1 className="card-title text-2xl font-semibold mb-4" style={{ fontSize: '2rem' }}>Perfil</h1>
                    <div className="divider my-4"></div>
                    <div className="text-left">
                        <h2 className="card-title text-lg font-semibold mt-4">Email</h2>
                        <p className="text-gray-700">eca.de.queiros@docentes.uminho.pt</p>
                        <div className="flex justify-end mt-4">
                            <button className="btn btn-sm" onClick={() => setShowModal(true)}>Editar Email</button>
                        </div>
                        <h2 className="card-title text-lg font-semibold mt-4">Password</h2>
                        <p className="text-gray-700">********</p>
                        <div className="flex justify-end mt-4">
                            <button className="btn btn-sm" onClick={() => setShowModal2(true)}>Editar Password</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isVisable={showModal} onClose={() => setShowModal(false)}>
                <div className="p-6">
                    <h2 className="card-title text-lg font-semibold mt-4">Inserir novo Email</h2>
                    <div className="divider my-4"></div>
                    <input type="text" className="input input-xs input-bordered w-full max-w-xs" />

                    <div className="flex justify-center mt-4">
                        <button className="btn btn-sm btn-outline btn-error mr-4" type="button" onClick={handleClick}>Cancelar</button>
                        <button className="btn btn-sm btn-primary" type="button" onClick={notify}>Atualizar
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
                          /></button>
                    </div>

                </div>

            </Modal>

            <Modal isVisable={showModal2} onClose={() => setShowModal2(false)}>
                <div className="p-6">
                    <h2 className="card-title text-lg font-semibold mt-4">Inserir nova Palavra passe</h2>
                    <div className="divider my-4"></div>
                    <input type="text" className="input input-xs input-bordered w-full max-w-xs" />

                    <div className="flex justify-center mt-4">
                        <button className="btn btn-sm btn-outline btn-error mr-4" type="button" onClick={handleClick}>Cancelar</button>
                        <button className="btn btn-sm btn-primary" type="button" onClick={notify}>Atualizar
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
                          /></button>
                    </div>
                </div>
            </Modal>
        </div></>
    );
}

export default EditarPerfilA;
