import React from 'react';
import logo from '../images/logo2.png';
import { useNavigate } from 'react-router-dom';

function NavbarDocente() {
    const history = useNavigate();
    const handleClick = () => {
        history('/notificacoesD');
    }
    return (
        <div className="navbar bg-base-100 shadow-xl">
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a href='/registoAluno'>Registar Aluno</a></li>
                    <li><a href='/criarProva'>Criar Prova</a></li>
                    <li><a href='/provasDocente'>Provas</a></li>
                </ul>
            </div>
            <div className="flex-1">
                <a href='/docente' className="btn-ghost logo">
                    <img src={logo} alt="Logo" style={{ width: '150px', height: '80px' }} />
                </a>
            </div>
            <div className="flex-1 flex justify-end mr-4">
                <button className="btn btn-ghost btn-circle" type="button" onClick={handleClick}>
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    </div>
                </button>
            </div>


            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                        <a href='/perfilDocente' className="justify-between">
                            Perfil
                        </a>
                    </li>
                    <li><a href='/'>Logout</a></li>
                </ul>
            </div>
        </div>
    );
}
export default NavbarDocente;

