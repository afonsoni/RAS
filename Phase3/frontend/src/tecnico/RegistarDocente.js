import React from "react";
import NavbarDocente from "../componentes/NavbarDocente";
import { useNavigate } from 'react-router-dom';
import NavbarTecnico from "../componentes/NavbarTecnico";


function RegistarDocente() {
  const history = useNavigate();
  const registoInd = () => {
      history('/registoDocenteInd');
  }
  const registoFile = () => {
      history('/registoDocenteFile');
  }
    return (
        <><NavbarTecnico />
        <div className="hero min-h-screen bg-base-200 text-center">
            <div className="card w-70 shadow-xl text-neutral-content rounded-lg bg-base-100">
                <div className="card-body text-center">
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h1 className="text-base font-semibold leading-10 text-gray-900" style={{ fontSize: '2rem' }}>
                            Registar Docente
                            </h1>
                            <hr></hr>
                            <br></br>
                            <h2 className="text-black">Escolha o método de como registar docente(s)</h2>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-center gap-x-10">
                    <button
                          type="button"
                          className="rounded-md bg-primary px-7 text-sm font-semibold text-white shadow-sm btn d-flex align-items-center justify-content-center"
                          onClick={registoInd}
                          >
                          Individual
                        </button>
                        <button
                          type="button"
                          className="rounded-md bg-primary px-7 text-sm font-semibold text-white shadow-sm btn d-flex align-items-center justify-content-center"
                          onClick={registoFile}
                          >
                          Ficheiro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}
export default RegistarDocente;   