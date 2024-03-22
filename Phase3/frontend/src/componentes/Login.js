import React from 'react';
import logo from '../images/logo.png';

import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useNavigate();
  const handleClick = () => {
    console.log('Login button clicked');
    if (username.toLowerCase() === 'docente') {
      history('/docente');
    } else if (username.toLowerCase() === 'aluno') {
      history('/aluno');
    }
    else if (username.toLowerCase() === 'tecnico') {
      history('/tecnico');
    }
  }
  return (
    <div className="hero min-h-screen flex flex-col items-center justify-center">
      <img src={logo} alt="Logo" style={{ width: '200px', height: '110px', marginTop: '-50px' }} />
      <div className="card w-70 bg-neutral text-neutral-content rounded-lg">
        <div className="card-body text-center">
          <h2 className="card-title">Autenticar</h2>
          <input type="text" placeholder="Email" className="input input-ghost w-full max-w-xs" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="text" placeholder="Password" className="input input-ghost w-full max-w-xs" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="label" id='linkPasse'>
            <a href="#" className="label-text-alt link link-hover text-white">Forgot password?</a>
          </div>
          <div className="card-actions justify-end">
            {/* <button className="btn btn-ghost">Cancelar</button> */}
            <button className="btn btn-primary" type="button" onClick={handleClick}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;