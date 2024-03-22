import React from "react";
import NavbarTecnico from "../componentes/NavbarTecnico";
import { useNavigate } from 'react-router-dom';

function GerirSalas() {
    const history = useNavigate();
  const adicionarSalas = () => {
      history('/adicionarSalas');
  }
  const removerSalas = () => {
      history('/removerSalas');
  }
    return (
        <><NavbarTecnico />
            <div className="hero min-h-screen bg-base-200 text-center">
            <div className="card w-70 shadow-xl text-neutral-content rounded-lg bg-base-100">
                <div className="card-body text-center">
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h1 className="text-base font-semibold leading-10 text-gray-900" style={{ fontSize: '2rem' }}>
                            Gerir Salas
                            </h1>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-center gap-x-10">
                    <button
                          type="button"
                          className="rounded-md bg-primary px-7 text-sm font-semibold text-white shadow-sm btn d-flex align-items-center justify-content-center"
                          onClick={adicionarSalas}
                          >
                          Adicionar Sala(s)
                        </button>
                        <button
                          type="button"
                          className="rounded-md bg-primary px-7 text-sm font-semibold text-white shadow-sm btn d-flex align-items-center justify-content-center"
                          onClick={removerSalas}
                          >
                          Remover Sala(s)
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
export default GerirSalas;