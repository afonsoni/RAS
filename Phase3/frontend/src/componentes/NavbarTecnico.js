import React from 'react';
import logo from '../images/logo2.png';

function NavbarTecnico() {
    return (
        <div className="navbar bg-base-100 shadow-xl">
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a href='/registoDocente'>Registar Docente</a></li>
                <li><a href='/gerirSalas'>Gerir Salas</a></li>
            </ul>
        </div>
        <div className="flex-1">
            <a href='/tecnico' className="btn-ghost logo">
                <img src={logo} alt="Logo" style={{ width: '150px', height: '80px'}} />
            </a>
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
export default NavbarTecnico;

