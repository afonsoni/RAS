import React from "react";
import NavbarTecnico from "../componentes/NavbarTecnico";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdicionarSalas() {
    const notify = () => toast("*notificação x*");
    const history = useNavigate();
    const voltar = () => {
        history('/gerirSalas');
    }
    return (
        <>
            <NavbarTecnico />
            <div className="hero min-h-screen bg-base-200 flex items-center justify-center">
                <div className="card w-96 bg-base-100 shadow-xl rounded-md p-6" style={{ width: '70%' }}>
                    <div className="card-body text-center">
                        <h1 className="card-title text-2xl font-semibold mb-4" style={{ fontSize: '2rem' }}>Adicionar Salas</h1>
                        <div className="divider my-4"></div>
                            <div className="sm:col-span-4">
                                <div className="mt-2 flex items-center gap-x-3">
                                    <input
                                        type="file"
                                        id="docente"
                                        className="file-input file-input-sm file-input-bordered file-input-secondary w-full max-w-xs"
                                        style={{ borderRadius: '3px' }}
                                    />
                                </div>
                            </div>                    
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            className="btn btn-sm btn-outline btn-error" type="button"
                            onClick={voltar}
                        >
                            Cancelar
                        </button>
                        <button className="btn btn-sm btn-primary" type="button"
                            onClick={notify}
                        >
                            Adicionar
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
            </div>
        </>
    );
}

export default AdicionarSalas;

