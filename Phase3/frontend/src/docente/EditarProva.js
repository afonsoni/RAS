import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DateInput } from "date-picker-svelte";
import NavbarDocente from "../componentes/NavbarDocente";
import { useNavigate } from 'react-router-dom';


function EditarProva() {
  const [date, setDate] = useState(new Date());
  const history = useNavigate();
  const handleClick = () => {
      history('/provasDocente');
  }
  const continuar = () => {
      history('/criarProva2');
  }
    return (
        <><NavbarDocente />
        <div className="hero min-h-screen bg-base-200">
            <div className="card shadow-xl w-1290 text-neutral-content rounded-lg bg-base-100 " style={{width: '70%'}}>
                <div className="card-body">
                <form> 
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                        <h1 className="text-base font-semibold leading-10 text-gray-900" style={{ fontSize: '2rem' }}>
                          Editar Prova
                        </h1>
                        <hr></hr>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                            <label htmlFor="provaNome" className="block text-sm font-medium leading-6 text-gray-900">
                                Nome
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    name="provaNome"
                                    id="provaNome"
                                    autoComplete="provaNome"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Nome da prova"
                                />
                                </div>
                            </div>
                            </div>
                          </div>
                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                            <label htmlFor="provaNome" className="block text-sm font-medium leading-6 text-gray-900">
                                Data
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    name="provaNome"
                                    id="provaNome"
                                    autoComplete="provaNome"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Nome da prova"
                                />
                                </div>
                            </div>
                            </div>
                          </div>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                            <label htmlFor="provaNome" className="block text-sm font-medium leading-6 text-gray-900">
                                Hora
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    name="provaNome"
                                    id="provaNome"
                                    autoComplete="provaNome"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Nome da prova"
                                />
                                </div>
                            </div>
                            </div>
                          </div>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                            <label htmlFor="provaNome" className="block text-sm font-medium leading-6 text-gray-900">
                                Sala(s)
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    name="provaNome"
                                    id="provaNome"
                                    autoComplete="provaNome"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Nome da prova"
                                />
                                </div>
                            </div>
                            </div>
                          </div>

                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={handleClick}>
                          Voltar
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm btn align-items-center justify-content-center"
                          onClick={continuar}
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
export default EditarProva;   