import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary-semilight">
        
      <div className="container-fluid justify-content-start">
          <NavLink to="/" className="decoration-none active">
            <span className="navbar-brand text-white">Task</span>
          </NavLink>
        <div className="navbar-nav">
          <NavLink to="/agregar" className="decoration-none">
            <span className="nav-link active text-white">Añadir</span>
          </NavLink>
        </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}