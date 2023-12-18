import { useState } from 'react'
import PropTypes from 'prop-types'

import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { MdError } from 'react-icons/md'

import './ToastMsg.css'

const ToastMsg = ({ msg }) => {
    const [showMsg, setshowMsg] = useState(true)

    const toggleShowMsg = () => setshowMsg(!setshowMsg)

    return (
        <ToastContainer position="bottom-center">
            <Toast onClose={toggleShowMsg} show={showMsg && msg !== ''} animation={false}>
                <Toast.Header>
                    {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
                    <strong className="me-auto">Atención!</strong>
                </Toast.Header>
                
                <Toast.Body className="toast-body">
                    <MdError size={48} style={{ marginRight: '16px' }} />
                    {msg}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

ToastMsg.propTypes = {
    msg: PropTypes.string
}

export default ToastMsg
