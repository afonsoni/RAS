import React from "react";
import { useNavigate } from 'react-router-dom';
function Profile() {
  const history = useNavigate();
  const handleClick = () => {
      history('/editar');
  }
  return (
    <div className="hero min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl rounded-md p-6" style={{ width: '70%' }}>
        <div className="card-body text-center">
          <h1 className="card-title text-2xl font-semibold mb-4" style={{ fontSize: '2rem' }}>Perfil</h1>
          <div className="divider my-4"></div>
          <div className="text-left">
            <h2 className="card-title text-lg font-semibold">Nome</h2>
            <p className="text-gray-700">Eça de Queirós</p>
            <h2 className="card-title text-lg font-semibold mt-4">Email</h2>
            <p className="text-gray-700">eca.de.queiros@docentes.uminho.pt</p>
            <h2 className="card-title text-lg font-semibold mt-4">Número Mecanográfico</h2>
            <p className="text-gray-700">d123456</p>
          </div>
          <div className="flex justify-end mt-4">
            <button className="btn btn-sm" type="button" onClick={handleClick}>Editar Perfil</button>
          </div>
        </div>
      </div>
    </div>


  );
}

export default Profile;
