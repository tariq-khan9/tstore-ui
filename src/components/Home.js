import {Container, Row, Col, Carousel} from 'react-bootstrap';
import React from 'react'
import './admin/Sidebar.css'
import Navbar from './Navbar';
import Slider from './homeComponents/Slider';
import { Box} from '@mui/material';
import Categories from './homeComponents/Categories';
import Footer from './homeComponents/Footer';
import NewArrivals from './homeComponents/NewArrivals';



const Home = () => {
  
  

  return (
    <div className='my-margin' >
      
      <Slider/>
      <NewArrivals/>
      <Categories/>
   
      <Footer/>
      
      
    </div>
  )
}

export default Home
