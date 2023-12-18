import { useState, useEffect }  from 'react'

import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import { FaCheck } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

import NewTask from './NewTask'
import ToastMsg from './ToastMsg'

import './App.css'

function App() {
  const [data, setData] = useState([])
  const [range, setRange] = useState('day')
  const [errorMsg, setErrorMsg] = useState('')
  const [showNewTaskWindow, setshowNewTaskWindow] = useState(false)

  const changeRange = range => setRange(range)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5050/api/tasks/range/${range}`)
        const jsonData = await response.json()
        setData(jsonData.data.length > 0 ? jsonData.data: [])
        setErrorMsg('')
      } catch (err) {
        // console.error(err)
        setErrorMsg(err.message)
      }
    }

    fetchData()
  }, [range])

  return (
    <>
      <Container fluid className="p-3">
        {data && <h1 className="header">ROLLING - Tareas ({data.length})</h1>}
        
        <ButtonGroup aria-label="Rango">
          <Button variant="secondary" onClick={() => changeRange('day')}>Día</Button>
          <Button variant="secondary" onClick={() => changeRange('week')}>Semana</Button>
          <Button variant="secondary" onClick={() => changeRange('month')}>Mes</Button>
        </ButtonGroup>

        &nbsp;<Button variant="success" onClick={() => { setshowNewTaskWindow(true) }}>Nueva tarea</Button>
        
        <ListGroup as="ol" numbered style={{ marginTop: '16px' }}>
          {data && data.length === 0 && <p>No hay tareas</p>}

          {data && data.length > 0 && data.map(item => {
            let statusColor = ''
            
            if (item.status === 'pending') {
              switch (item.priority) {
                case 'low':
                  statusColor = 'info'
                  break
                
                case 'medium':
                  statusColor = 'warning'
                  break
                
                default:
                  statusColor = 'danger'
              }
            } else {
              statusColor = 'success'
            }

              // return <ListGroup.Item as="li" variant={statusColor} key={item._id}>{item.description}</ListGroup.Item>
            return <ListGroup.Item key={item._id} as="li" variant={statusColor} className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div>{item.description}</div>
                </div>

                <div>
                  <MdDelete className="a_item" onClick={() => alert(`Borrar tarea ${item._id}`)} />
                  <br />
                  <FaCheck className="a_item" onClick={() => alert(`Marcar tarea ${item._id}`)} />
                </div>
              </ListGroup.Item>
          })}
        </ListGroup>

        {showNewTaskWindow && <NewTask hideFn={setshowNewTaskWindow} err={errorMsg} />}

        <ToastMsg msg={errorMsg} position="bottom-end" />
      </Container>
    </>
  )
}

export default App
