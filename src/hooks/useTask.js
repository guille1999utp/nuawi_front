import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const useTask = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/task`);

                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                const result = await response.json();
                setTasks(result);
                setLoading(false);
            } catch (error) {
                setError('Error al cargar los datos');
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const deleteTask = async (taskId) => {
        try {
            
            const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/task/${taskId}`, {
                method: 'DELETE'
            });
            

            if (!response.ok) {
                throw new Error('Error al eliminar la tarea');
            }
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            
            setTasks(updatedTasks);

            Toast.fire({
                icon: 'success',
                title: 'Eliminado exitosamente'
            })
        } catch (error) {
            console.error('Error al eliminar la tarea:', error.message);
        }
    };

    const addTask = async (title) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });

            if (!response.ok) {
                throw new Error('Error al agregar la tarea');
            }

            const result = await response.json();
            const newTask = result.task;
            setTasks((prevTasks) => [...prevTasks, newTask]);
        } catch (error) {
            console.error('Error al agregar la tarea:', error.message);
        }
    };

    const updateTask = async (taskId, updatedData) => {
        try {
          const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/task/${taskId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
          });
    
          if (!response.ok) {
            throw new Error('Error al actualizar la tarea');
          }
    
          const updatedTask = await response.json();

          const updatedTasks = tasks.map((task) => (task.id === taskId ? updatedTask.task : task));
          
          setTasks(updatedTasks);
        } catch (error) {
          console.error('Error al actualizar la tarea:', error.message);
        }
      };

    return { tasks, loading, error, deleteTask, addTask, updateTask };
};

export default useTask;