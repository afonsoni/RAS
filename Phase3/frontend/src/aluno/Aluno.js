import React from "react";
import NavbarAluno from "../componentes/NavbarAluno";


function Aluno() {
    return (
        <><NavbarAluno />
        <div className="hero min-h-screen bg-base-200 text-center">
            <div className="card w-1290 text-neutral-content rounded-lg bg-base-100 " style={{width: '70%'}}>
                <div className="card-body">
                    <form> 
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h1 className="text-base font-semibold leading-10 text-gray-900" style={{ fontSize: '2rem' }}>
                                Bem Vindo!
                                </h1>
                            </div>
                        </div>
                    </form>     
                </div>
            </div>
        </div>
    </>
  );
}
export default Aluno;   