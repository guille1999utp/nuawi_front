import React, { useState, useEffect, useContext } from 'react';
import { CardDrags } from './components/cards/CardDrags';
import { BacklogContext } from './context';
import { NavLink } from 'react-router-dom';

function App() {
  
  const { error,loading,tasks } = useContext(BacklogContext);

  return (
    <>
      {loading ?
        <div className="w-100 d-flex justify-content-center align-items-center" style={{minHeight:"100vh"}}>
          <div className="spinner-border" role="status" style={{ color: "#5FA9C4" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        : (
      <div className="mx-0">
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <div className="row overflow-auto flex-nowrap">
            <div className="col-12 bg-primary-light p-3 parent-card" style={{ minHeight: "calc(100vh - 56px)" }}>
              <div className="col bg-secondary-light rounded p-3">
                <h3>Task</h3>
                {tasks?.length ? (
                  tasks.map((task) => <CardDrags data={task} key={task.id} />)
                ) : (
                  <div>
                    <span>
                     No hay tareas disponibles, si quieres agregar tareas por favor oprime el link de abajo :)
                    </span>
                    <br />
                    <NavLink to="/agregar" className="decoration-none">Agregar nuevos elementos</NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    )}
    </>
  )
}

export default App
