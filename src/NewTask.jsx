import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

import './NewTask.css'

const NewTask = ({ hideFn, errorMsg }) => {
    const [frm, setFrm] = useState({ description: '', target_date: '', target_date_d: '', target_date_h: '', priority: 'medium' })

    const handleChange = (event) => {
        setFrm({ ...frm, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const frmElement = e.currentTarget
            
            if (!frmElement.checkValidity()) {
                errorMsg = 'Por favor, complete los campos requeridos'
            } else {
                // Agregar controles personalizados al formulario
                frm.target_date = new Date(`${frm.target_date_d} ${frm.target_date_h}`).toISOString()
                console.log(frm)
                
                /* const process = await fetch(`http://localhost:5050/api/tasks`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(frm)
                })
                const processJson = await process.json()
                console.log(processJson) */
            }
        } catch (err) {
            errorMsg = err.message
        }
    }

    return (
        <>
            <div className="new-task">
                <h2>Nueva tarea</h2>

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

NewTask.propTypes = {
    hideFn: PropTypes.func,
    errorMsg: PropTypes.string
}

export default NewTask