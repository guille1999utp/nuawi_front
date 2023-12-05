import React, { useContext, useState } from 'react'
import { BacklogContext } from '../../context';
import Swal from 'sweetalert2'
import { IoMdCloseCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";


export const CardDrags = ({ data }) => {

    const { deleteTask,updateTask } = useContext(BacklogContext);

    const deleteItem = (e) => {

        e.stopPropagation();
        Swal.fire({
            title: 'Estas seguro de querer borrarlo?',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
        }).then(async (result) => {

            if (result.isConfirmed) {
                try {
                    deleteTask(data.id);
                }
                catch (error) {
                    console.error('Error al realizar la petición:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un problema al actualizar la información.',
                        icon: 'error',
                    });
                }
            };
        })

    }

    const onChangeStatus = (status) => {
        updateTask(
            data.id,
            {
                status
            }
        )
    }

    const editItem = (e) => {

        Swal.fire({
            title: 'Modifique el campo que desea cambiar',
            html:
                '<label for="swal-input1" class="mt-3">Titulo</label>' + `<input id="swal-input1" class="swal2-input w-75" placeholder="Titulo" value="${data.title}">` +
                '<label for="swal-select" class="mt-3 mb-3">Status</label><br/>' +
                `<select id="swal-select" class="swal2-input w-75" value="${data.status}" style="border-color: red;border: solid #d9d9d9 1px;border-radius: 4px;">` +
                `<option value="pendiente" ${data.status == "pendiente" ? "selected" : ""}>Pendiente</option>` +
                `<option value="hecho" ${data.status == "hecho" ? "selected" : ""}>Hecho</option>` +
                '</select>',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            preConfirm: () => {
                const title = document.getElementById('swal-input1').value;
                const status = document.getElementById('swal-select').value;

                if (!title || !status) {
                    Swal.showValidationMessage('Todos los campos son obligatorios');
                }

                updateTask(
                    data.id,
                    {
                        title,
                        status
                    }
                )

            },
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Información Actualizada',
                    icon: 'success',
                });
            }
        });
    }



    return (
        <div className={`bg-white rounded p-3 card  mt-3`}>
            <div className="card-body">
                <span className='fw-bolder card-title'>{data.title}</span> <br />
                <div className='d-flex mt-3'>
                    <button type="button" className="btn btn-primary bg-primary-semilight" onClick={editItem}>Editar</button>
                    <button type="button" className="btn btn-danger ms-4" onClick={deleteItem}>Eliminar</button>
                </div>
                {
                    data.status == "pendiente" ?
                    <IoMdCloseCircle fontSize={53} color='red' style={{cursor:"pointer",position:"absolute",right:"30px",top:"35%"}} onClick={()=>onChangeStatus("hecho")}/>
                    :
                    <FaCheckCircle fontSize={50} color='green' style={{cursor:"pointer",position:"absolute",right:"30px",top:"35%"}} onClick={()=>onChangeStatus("pendiente")}/>
                }
            </div>
        </div>
    )
}
