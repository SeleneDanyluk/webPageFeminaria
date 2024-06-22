import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import './NewBook.css'

const NewBook = () => {
  const [titleEntered, setTitleEntered] = useState('')
  const [authorEntered, setAuthorEntered] = useState('')
  const [stockEntered, setStockEntered] = useState(0)
  const [priceEntered, setPriceEntered] = useState(0)
  const [descriptionEntered, setDescriptionEntered] = useState('')
  const [formValid, setFormValid] = useState(false)

  const titleRef = useRef(null)

  const handleTitleEntered = (e) => {
    setTitleEntered(e.target.value)
  }
  const handleAuthorEntered = (e) => {
    setAuthorEntered(e.target.value)
  }
  const handleStockEntered = (e) => {
    setStockEntered(e.target.value)
  }
  const handlePriceEntered = (e) => {
    setPriceEntered(e.target.value)
  }
  const handleDescriptionEntered = (e) => {
    setDescriptionEntered(e.target.value)
  }

  useEffect(() => {
    titleRef.current.focus()
}, [])

  useEffect(() => {

    const timer = setTimeout(() => {
      setFormValid(
        titleEntered !== "" &&
        authorEntered !== "" &&
        stockEntered !== 0 &&
        priceEntered !== 0
      );
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [titleEntered, authorEntered, stockEntered, priceEntered])

  return (
    <>
      <Container>
        <Form className='py-3'>
          <Row className='d-flex justify-content-center'>
            <h2 className='w-25 text-center border-bottom pb-3'>Agregar Libro</h2>
          </Row>
          <Row className='d-flex justify-content-center px-5 gx-5'>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  className='form-control-sm input-newBook'
                  type="text"
                  onChange={handleTitleEntered}
                  value={titleEntered}
                  ref={titleRef}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  className='form-control-sm input-newBook'
                  type="text"
                  onChange={handleStockEntered}
                  value={stockEntered}
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Autora</Form.Label>
                <Form.Control
                  className='form-control-sm input-newBook'
                  type="text"
                  onChange={handleAuthorEntered}
                  value={authorEntered}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  className='form-control-sm input-newBook'
                  type="text"
                  onChange={handlePriceEntered}
                  value={priceEntered}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className='px-5'>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                className='form-control-sm input-newBook'
                rows={3}
                value={descriptionEntered}
                onChange={handleDescriptionEntered}
              />
            </Form.Group>
          </Row>
          <Row>
            <Col className='d-flex justify-content-center gap-2 mt-3'>
              <Button disabled={!formValid} type="submit" variant='primary' className='btn-newBook'>AGREGAR</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export default NewBook