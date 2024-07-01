import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import './Autoras.css'
import Autora from '../autora/Autora'
import useModal from '../../hooks/useModal'
import ModalPage from '../modalPage/ModalPage'

const Autoras = () => {
  //https://localhost:7069/api/Authors
  const [authors, setAuthors] = useState([])
  const [titleModal, setTitleModal] = useState('')
  const [bodyModal, setBodyModal] = useState('')
  const { isShown, showModal, hideModal } = useModal()
  useEffect(() => {
    fetch("https://localhost:7069/api/Authors", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los autoras");
        }
        return response.json();
      })
      .then((authorsData) => {
        setAuthors(authorsData);
      })
      .catch((error) => {
        console.error("Error:", error);
        setTitleModal('Error')
        setBodyModal(error.message)
        showModal()
      });
  }, []);
  return (
    <>
      <Container fluid="sm">
        <Row className='d-flex justify-content-center my-5'>
          <h2 className='w-25 text-center border-bottom pb-3'>Autoras</h2>
        </Row>
        <Row className='gx-3'>
          {authors.map((author) => (
            <Autora
              key={author.id}
              name={author.name}
              img={author.imageUrl}
            />
          ))}
        </Row>
      </Container>
      <ModalPage
        title={titleModal}
        body={bodyModal}
        show={isShown}
        onClose={hideModal}
      />
    </>
  );
};

export default Autoras