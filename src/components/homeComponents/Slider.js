import React from 'react'
import styled from 'styled-components';
import pic1 from '../../img/1.jpg';
import pic2 from '../../img/2.jpg';
import pic3 from '../../img/3.jpg';
import Carousel from 'react-bootstrap/Carousel';

const Container = styled.div`
 width: 100%;



 margin-top: 70px;
`;

const Slider = () => {
  return (
    <Container>
      <Carousel fade={true} indicators={false}>
      <Carousel.Item style={{backgroundColor: 'black'}}>
        <img
          className="d-block w-100"
          src={pic1}
          alt="Second slide"
          style={{opacity: '0.4'}}  />

        <Carousel.Caption style={{top: '62%', transform: 'translateY(-50%)'}}>
          <h1 style={{fontSize:'60px', fontFamily: 'Raleway, sans-serif', fontWeight:'bold'}}>First slide label</h1>
          <p style={{fontSize:'25px', fontFamily: 'Raleway, sans-serif'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item style={{backgroundColor: 'black'}}>
        <img
          className="d-block w-100"
          src={pic2}
          alt="Second slide"
          style={{opacity: '0.4'}}  />

        <Carousel.Caption style={{top: '62%', transform: 'translateY(-50%)'}}>
          <h1 style={{fontSize:'60px', fontFamily: 'Raleway, sans-serif', fontWeight:'bold'}}>Second slide label</h1>
          <p style={{fontSize:'25px', fontFamily: 'Raleway, sans-serif'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item style={{backgroundColor: 'black'}}>
        <img
          className="d-block w-100"
          src={pic3}
          alt="Second slide"
          style={{opacity: '0.5'}}  />

        <Carousel.Caption style={{top: '62%', transform: 'translateY(-50%)'}}>
          <h1 style={{fontSize:'60px', fontFamily: 'Raleway, sans-serif', fontWeight:'bold'}}>Third slide label</h1>
          <p style={{fontSize:'25px', fontFamily: 'Raleway, sans-serif'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item style={{backgroundColor: 'black'}}>
        <img
          className="d-block w-100"
          src={pic2}
          alt="Second slide"
          style={{opacity: '0.5'}}  />

        <Carousel.Caption style={{top: '62%', transform: 'translateY(-50%)'}}>
          <h1 style={{fontSize:'60px', fontFamily: 'Raleway, sans-serif', fontWeight:'bold'}}>Last slide label</h1>
          <p style={{fontSize:'25px', fontFamily: 'Raleway, sans-serif'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      
    </Carousel>
    </Container>
  )
}

export default Slider
