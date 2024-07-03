import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import './NewBook.css'
import useModal from '../../hooks/useModal';
import ModalPage from '../modalPage/ModalPage'

const NewBook = () => {
  const [titleEntered, setTitleEntered] = useState('');
  const [authorEntered, setAuthorEntered] = useState('');
  const [stockEntered, setStockEntered] = useState(0);
  const [priceEntered, setPriceEntered] = useState(0);
  const [descriptionEntered, setDescriptionEntered] = useState('');
  const [imgEntered, setImgEntered] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const titleRef = useRef(null);
  const [titleModal, setTitleModal] = useState('')
  const [bodyModal, setBodyModal] = useState('')
  const { isShown, showModal, hideModal } = useModal()

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  useEffect(() => {
    titleRef.current.focus();
  }, []);

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
  const handleImgEntered = (e) => {
    setImgEntered(e.target.value)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormValid(
        titleEntered !== '' &&
        authorEntered !== '' &&
        stockEntered > 0 &&
        priceEntered > 0 &&
        imgEntered !== ''
      );
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [titleEntered, authorEntered, stockEntered, priceEntered, imgEntered]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) {
      setTitleModal('Error')
      setBodyModal('Por favor, rellene todos los campos obligatorios.')
      showModal()
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

    const bookToAdd = {
      title: titleEntered,
      description: descriptionEntered,
      author: authorEntered,
      price: priceEntered,
      stock: stockEntered,
      imageUrl: imgEntered,
    };

    setIsLoading(true);
    try {
      const response = await fetch('https://localhost:7069/api/Book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookToAdd),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add book.');
      }

      const data = await response.json();
      console.log('Book added successfully', data);

      setTitleEntered('');
      setAuthorEntered('');
      setStockEntered(0);
      setPriceEntered(0);
      setDescriptionEntered('');
      setImgEntered('');
      setTitleModal('Libro añadido exitosamente !.')
      setBodyModal('')
      showModal()
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <Container>
        <Form className='py-3' onSubmit={handleSubmit}>
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
              <Form.Label>Imagen URL</Form.Label>
              <Form.Control
                className='form-control-sm input-newBook'
                value={imgEntered}
                onChange={handleImgEntered}
              />
            </Form.Group>
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
      <ModalPage
        title={titleModal}
        body={bodyModal}
        show={isShown}
        onClose={hideModal}
      />
    </>
  );
};

export default NewBook