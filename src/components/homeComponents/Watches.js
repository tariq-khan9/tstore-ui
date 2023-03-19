import {React, useState, useEffect} from 'react';
import '../admin/Sidebar.css';
import {Container, Row, Col} from 'react-bootstrap';
import pic1 from '../../img/garments2.png';
import axios from 'axios';
import  styled  from 'styled-components';
import { border } from '@mui/system';




const Container1 = styled.div`
margin-top: 50px;
padding-bottom: 50px;
 width: 100%;
 display: flex;
 flex: 1;
 justify-content: space-evenly;
 flex-wrap: wrap;
`;

const CategoryItem = styled.div`
  margin: 0px;
  margin-bottom: 30px;
  height: 50vh;
  width: 330px;
  position: relative;
  background-color: black;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const Image = styled.img`
width: 100%;
height: 100%;

`;

const Info = styled.div`
position: absolute;
width: 100%;
height: 100%;
top: 0;
left: 0;
display: flex;
opacity: 0;
&:hover{
   background-color: rgba(0,0,0,0.6);
   opacity: 1;
}
flex-direction: column;
padding-left: 10px;
padding-top: 10px;

`;

const Title = styled.h4`
 color: white;
 margin-bottom: 20px;
 margin-top: 0;
 font-family: 'Raleway', sans-serif;
`;

const Details = styled.h6`
 color: white;
 margin-bottom: 20px;
 font-family: 'Raleway', sans-serif;
`;


const Watches = () => {

    const [allData, setAllData] = useState([]);

   

 const getData= async()=> {
   const res = await axios.get("http://127.0.0.1:8000/api/watches");
   setAllData(res.data);
    
   }
    
 

 useEffect(() => {
  getData()
}, []);

 
 console.log(allData);



  return (
    <div >
      
    <Container fluid style={{marginTop:'100px'}}>
      <Row className='d-flex mx-4 p-0  '   style={{justifyContent:'center' }}>
        <Col lg={5} md={5} sm={12} className='d-none d-md-inline ' style={{ height:'50vh', padding:'0px'}}>
          <Image style={{}} src={pic1}/>
        </Col>
        <Col lg={7} md={7} sm={12} className='my-margin w-lg-50 w-md-100 px-5' style={{  height:'50vh'}}>
          <h1 className='display-1' style={{fontFamily: 'Italianno, cursive', color:'#7b1fa2', textShadow:'5px 5px 10px black'}}>Garments</h1>
          <h2 style={{fontFamily: 'Italianno, cursiv', objectFit:'cover'}}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts</h2>
        </Col>
      </Row>
      </Container>
     
     <Container1>
      {allData.map((item)=>(
        <CategoryItem key={item.id}>
          <Image src={item.image_path}/>
          <Info>
            <Title>{item.name}</Title>
            <Details>Price: {item.price}</Details>
            <Details>Description: {item.description}</Details>
          </Info>
        </CategoryItem>
      ))}
      
     
      
     
    </Container1>
    </div>
  )
}

export default Watches
