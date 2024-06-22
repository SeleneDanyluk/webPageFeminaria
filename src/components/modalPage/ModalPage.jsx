import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import PropTypes from 'prop-types';
import './ModalPage.css'

const ModalPage = ({ title, body, show, onClose }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {body}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="link" className='btn-modal' onClick={onClose}>
            Regresar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
ModalPage.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func
};

export default ModalPage