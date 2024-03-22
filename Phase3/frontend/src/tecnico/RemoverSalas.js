import React from "react";
import NavbarTecnico from "../componentes/NavbarTecnico";

function RemoverSalas() {
    // const voltar = () => {
    //     history('/gerirSalas');
    // }
    return (
        <><NavbarTecnico />
            <div className="hero min-h-screen bg-base-200 flex items-center justify-center">
                <div className="card w-96 bg-base-100 shadow-xl rounded-md p-6" style={{ width: '70%' }}>
                    <div className="card-body text-center">
                        <h1 className="card-title text-2xl font-semibold mb-4" style={{ fontSize: '2rem' }}>Remover Salas</h1>
                        <div className="divider my-4"></div>
                        <div className="text-left">
                            <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full max-w-xs"/>
                            <button className="btn btn-sm btn-primary" type="button">Remover</button>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            className="btn btn-sm btn-outline btn-error" type="button"
                            // onClick={voltar}
                        >
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default RemoverSalas;