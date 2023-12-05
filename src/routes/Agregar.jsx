import React, { useContext, useState } from 'react'
import { BacklogContext } from '../context';
import Swal from 'sweetalert2';

const Agregar = () => {

  const { addTask } = useContext(BacklogContext);

  const [title, setTitle] = useState("");

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(title.length < 1){ 
        Swal.fire({
        title: 'Error',
        text: 'no puedes agregar una tarea vacia',
        icon: 'error',
      });
      return;
    }

      addTask(title)

      setTitle("");

      Swal.fire({
        title: 'Información Actualizada',
        icon: 'success',
      });

    } catch (error) {
      
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al actualizar la información.',
        icon: 'error',
      });
    }
  };

  return (
    <form className='w-75 m-auto mt-5 border p-4' onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Titulo</label>
        <input value={title} onChange={onChange} name='title' type="text" className="form-control" id="title" aria-describedby="emailHelp" />
      </div>
      <button type="submit" className="btn btn-primary bg-primary-semilight">Agregar</button>
    </form>
  )
}

export default Agregar;