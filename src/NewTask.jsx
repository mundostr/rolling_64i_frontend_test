import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

import config from './config'

import './NewTask.css'

const NewTask = ({ hideFn, errorMsg }) => {
    // Seteamos un objeto frm para manejar todos los campos del formulario.
    // Podríamos también setear variables separadas para cada campo
    const [frm, setFrm] = useState({ description: '', target_date: '', target_date_d: '', target_date_h: '', priority: 'medium' })

    const handleChange = (event) => {
        // El objeto igualmente es cómodo, porque cuando hay un cambio en cualquiera de los campos,
        // simplemente actualizamos la key que corresponde
        setFrm({ ...frm, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const frmElement = e.currentTarget
            
            // checkValidity() indica si el formulario cumple con los atributos html activos,
            // required, min, max, type, etc.
            if (!frmElement.checkValidity()) {
                errorMsg = 'Por favor, complete los campos requeridos'
            } else {
                // Aquí podesmos agregar controles personalizados al formulario
                // o por ejemplo realizar algunos ajustes de datos, como en este caso
                // la generación de una string ISO de fecha y hora.
                frm.target_date = new Date(`${frm.target_date_d} ${frm.target_date_h}`).toISOString()
                
                // Enviamos una solicitud post al endpoint, incluyendo en el body el frm
                // Por supuesto podríamos también utilizar Axios y colocar este código en un
                // método de controlador por separado, para mayor orden.
                const process = await fetch(`${config.BACKEND_BASE_URL}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(frm)
                })
                const processJson = await process.json()
                console.log(processJson)
            }
        } catch (err) {
            errorMsg = err.message
        }
    }

    return (
        <>
            <div className="new-task">
                <h2>Nueva tarea</h2>

                {/*
                Importante!: utilizar encType="mutipart/form-data" en el form
                si se van a enviar campos tipo file.
                */}
                <form onSubmit={handleSubmit}>
                    <div>
                        <textarea className="frm-field" name="description" value={frm.description} onChange={handleChange} placeholder="Descripción" rows={3} style={{ marginBottom: '1em' }} required="required" />
                        <input className="frm-field" type="date" name="target_date_d" value={frm.target_date_d} onChange={handleChange} required="required" />
                        <input className="frm-field" type="time" name="target_date_h" value={frm.target_date_h} onChange={handleChange} required="required" />

                        <h4 style={{ marginTop: '0.5em' }}>Prioridad:</h4>
                        <input type="radio" name="priority" value="high" onChange={handleChange} /> Alta<br />
                        <input type="radio" name="priority" value="medium" onChange={handleChange} checked /> Media<br />
                        <input type="radio" name="priority" value="low" onChange={handleChange} /> Baja
                    </div>

                    <div style={{ marginTop: '1em' }}>
                        {errorMsg && <p>{errorMsg}</p>}
                    </div>

                    <div style={{ marginTop: '1em' }}>
                        <Button type="submit" variant="success">Cargar</Button>
                        &nbsp;
                        <Button variant="light" onClick={() => { hideFn(false) }}>Cerrar</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

// Este agregado nos permite especificar los tipos de los distintos atributos
// recibidos como props en el componente, para lograr mayor clarificación del código
// y evitar mensajes de error del lint del editor.
NewTask.propTypes = {
    hideFn: PropTypes.func,
    errorMsg: PropTypes.string
}

export default NewTask