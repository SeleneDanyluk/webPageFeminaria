import React from 'react'
import { Col } from 'react-bootstrap'
import PropTypes from 'prop-types';

const Autora = ({ name, img, key }) => {
  return (
    <>
        <Col xs={6} md={4} lg={3} className='d-flex flex-column justify-content-between mb-4'> 
            <img src={img} className='img-author align-self-center' alt={name} />
            <h3 className='fs-4 text-center pt-3'>{name}</h3>
        </Col>
    </>
  )
}

Autora.propTypes = {
    name: PropTypes.string,
    img: PropTypes.string
};

export default Autora