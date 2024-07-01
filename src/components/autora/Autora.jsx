import React from 'react'
import { Col, Card } from 'react-bootstrap'
import PropTypes from 'prop-types';
import './Autora.css'

const Autora = ({ name, img }) => {
  return (
    <>
      <Col xs={6} md={4} lg={3} className='d-flex flex-column justify-content-between mb-4'>
        <Card className="bg-dark text-white container-img">
          <Card.Img src={img} alt={name} />
          <Card.ImgOverlay>
            <Card.Title>{name}</Card.Title>
          </Card.ImgOverlay>
        </Card>
      </Col>
    </>
  )
}

Autora.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string
};

export default Autora