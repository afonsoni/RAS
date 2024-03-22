import React from "react";
//import ReactDOM from "react-dom";
//import { DateInput } from "date-picker-svelte";
import NavbarDocente from "../componentes/NavbarDocente";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function RegistarAluno() {
    //const [date, setDate] = useState(new Date());
    const notify = () => toast("*notificação x*");
    const history = useNavigate();
    const cancel = () => {
        history('/registoAluno');
    }
    return (
        <><NavbarDocente />
            <div className="hero min-h-screen bg-base-200">
                <div className="card w-1290 shadow-xl text-neutral-content rounded-lg bg-base-100 " style={{ width: '70%' }}>
                    <div className="card-body">
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h1 className="text-base font-semibold leading-10 text-gray-900" style={{ fontSize: '2rem' }}>
                                    Registar Alunos
                                </h1>
                                <hr></hr>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                        <label htmlFor="provaNome" className="block text-sm font-medium leading-6 text-gray-900">
                                            Aluno a registar
                                        </label>

                                        <div className="mt-2 flex items-center gap-x-3">
                                            <input
                                                type="file"
                                                className="file-input file-input-sm file-input-bordered file-input-secondary w-full max-w-xs"
                                                style={{ borderRadius: '3px' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button
                                    className="btn btn-sm btn-outline btn-error" type="button"
                                    onClick={cancel}
                                >
                                    Cancelar
                                </button>
                                <button className="btn btn-sm btn-primary" type="button"
                                    onClick={notify}
                                >
                                    Registar
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
                </div>
            </div>
        </>
    );
}
export default RegistarAluno;   