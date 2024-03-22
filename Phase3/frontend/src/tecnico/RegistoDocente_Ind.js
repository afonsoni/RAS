import React from "react";
import NavbarTecnico from "../componentes/NavbarTecnico";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function RegistarDocente_Ind() {
    const notify = () => toast("*notificação x*");
  const history = useNavigate();
  const cancel = () => {
      history('/registoDocente');
  }
    return (
        <><NavbarTecnico />
        <div className="hero min-h-screen bg-base-200">
            <div className="card w-1290 shadow-xl text-neutral-content rounded-lg bg-base-100 " style={{width: '70%'}}>
                <div className="card-body">
                <form> 
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                        <h1 className="text-base font-semibold leading-10 text-gray-900" style={{ fontSize: '2rem' }}>
                          Registar Docente
                        </h1>
                        <hr></hr>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                            <label htmlFor="nomeDocente" className="block text-sm font-medium leading-6 text-gray-900">
                                Nome
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    name="nomeDocente"
                                    id="nomeDocente"
                                    autoComplete="nomeDocente"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Nome do docente"
                                />
                                </div>
                            </div>
                            </div>
                            <div className="sm:col-span-4">
                            <label htmlFor="numDocente" className="block text-sm font-medium leading-6 text-gray-900">
                                Número Mecanográfico
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    name="numDocente"
                                    id="numDocente"
                                    autoComplete="numDocente"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Número Mecanográfico"
                                />
                                </div>
                            </div>
                            </div>
                            <div className="sm:col-span-4">
                            <label htmlFor="emailDocente" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    name="emailDocente"
                                    id="emailDocente"
                                    autoComplete="emailDocente"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Email do docente"
                                />
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button className="btn btn-sm btn-outline btn-error" type="button" onClick={cancel}>
                          Cancelar
                        </button>
                        <button
                          className="btn btn-sm btn-primary" type="button" onClick={notify}
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
                </form>     
        </div>
      </div>
    </div>
    </>
  );
}
export default RegistarDocente_Ind;   