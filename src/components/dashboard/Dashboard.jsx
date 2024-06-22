import React from 'react'
import { Carousel, Image, Button } from 'react-bootstrap';
import './Dashboard.css'
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleClick = (e) =>{
      const path = e.target.getAttribute('to');
      navigate(path);
  };
  return (
    <div>
      <div className='header-image-container'>
        <Image
          src="https://res.cloudinary.com/di0y6v99p/image/upload/v1718987297/Frame_11_nclxs8.png"
          fluid
          className="header-image"
        />
        <div className="header-content">
          <h1>Colección MUJERES</h1>
          <p>Bienvenidos a la Colección Mujeres, una iniciativa editorial dedicada a celebrar y promover la voz y el talento de las autoras mujeres. Esta colección reúne una selección diversa y rica de obras que abarcan distintos géneros literarios, desde la ficción contemporánea hasta la poesía, pasando por ensayos reveladores y memorias conmovedoras.

            En Colección Mujeres, creemos en el poder transformador de la literatura y en la importancia de dar visibilidad a las perspectivas únicas y variadas de las escritoras. Cada libro incluido en esta serie ha sido cuidadosamente seleccionado no solo por su calidad literaria, sino también por su capacidad para inspirar, desafiar y enriquecer a los lectores.</p>
          <Button variant="primary" onClick={handleClick} to={"/libros"}>Descubrir</Button>
        </div>
      </div>
      <div className='carrousel-container'>
        <Carousel>
          <Carousel.Item interval={1000}>
            <Image
              src="https://res.cloudinary.com/di0y6v99p/image/upload/v1718575119/samples/two-ladies.jpg"
              fluid
              alt="First slide"
              className="carousel-image"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <Image
              src="https://res.cloudinary.com/di0y6v99p/image/upload/v1718575129/cld-sample-3.jpg"
              fluid
              alt="Second slide"
              className="carousel-image"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image
              src="https://res.cloudinary.com/di0y6v99p/image/upload/v1718575126/samples/cup-on-a-table.jpg"
              fluid
              alt="Third slide"
              className="carousel-image"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default Dashboard