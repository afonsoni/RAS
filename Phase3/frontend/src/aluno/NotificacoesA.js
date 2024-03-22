import React, { useState, useEffect } from "react";
import NavbarAluno from "../componentes/NavbarAluno";

function NotificacoesA() {
  const [notifications, setNotifications] = useState([]);

  const idUtilizador = "pg53895"; // Replace "aluno" with the actual ID
  useEffect(() => {
    fetch(`/notification/${idUtilizador}`)
      .then((response) => response.json())
      .then((data) => setNotifications(data))
      .catch((error) => console.error(error));
  }, []);
  
  return (
    //faz uma pagina para fazer display das notificações
    <>
      <NavbarAluno />
      <div className="overflow-x-auto">
        <div className="hero  min-h-screen bg-base-200">
          <div
            className="card shadow-xl w-1290 text-neutral-content rounded-lg bg-base-100 "
            style={{ width: "70%", marginTop: "20px" }}
          >
            <div className="card-body">
              <h1
                className="text-base font-semibold leading-10 text-gray-900"
                style={{ fontSize: "1.5rem" }}
              >
                Notificações
              </h1>
              {notifications.map((notification, index) => (
                <div key={index} role="alert" className="alert shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-info shrink-0 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <div>
                    <h3 className="font-bold">{notification.t}</h3>
                    <div className="text-xs">{notification.c}</div>
                  </div>
                  <button className="btn btn-sm">See</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default NotificacoesA;
