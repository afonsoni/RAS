import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarDocente from '../componentes/NavbarDocente';

function Consultar() {
    return (
        <><NavbarDocente />
            <div className="overflow-x-auto">
                <div className="hero  min-h-screen bg-base-200">
                    <div className="card shadow-xl w-1290 text-neutral-content rounded-lg bg-base-100 " style={{ width: '70%', marginTop: '20px' }}>
                        <div className="card-body">
                            <h1 className="text-base font-semibold leading-10 text-gray-900" style={{ fontSize: '1.5rem' }}>Provas</h1>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Prova</th>
                                        <th>Data</th>
                                        <th>Hora</th>
                                        <th>Sala</th>
                                        <th>Prof</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className='text-black rounded-md'>
                                    <tr>
                                        <th>1</th>
                                        <td>RAS</td>
                                        <td>03/01/2024</td>
                                        <td>12:00:00</td>
                                        <td>Sala 2.02</td>
                                        <td>Prof. Fernando Pessoa; Prof. Eça de Queirós</td>
                                    </tr>
                                    <hr></hr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
}
export default Consultar;