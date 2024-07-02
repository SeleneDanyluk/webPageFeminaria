import React from 'react';
import { Button } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './NotFound.css';

const NotFound = () => {
  const errorImage = 'https://i.imgur.com/cu9E0GR.jpeg';

  return (
    <CSSTransition in={true} appear={true} timeout={300} classNames="page">
      <div className="not-found-container">
        <img src={errorImage} alt="Error 404" />
        <br />
        <Button className="custom-violet-button" href="/">Volver al inicio</Button>
      </div>
    </CSSTransition>
  );
};

export default NotFound;
