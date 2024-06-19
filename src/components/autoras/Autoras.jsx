import React from 'react'
import { authors } from '../../data/authors'
import { Container, Row } from 'react-bootstrap'
import './Autoras.css'
import Autora from '../autora/Autora'

const Autoras = () => {
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
              img={author.img}
            />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Autoras