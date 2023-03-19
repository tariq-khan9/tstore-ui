import {React, useState, useEffect} from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import  styled  from 'styled-components';

const Container1 = styled.div`

padding-right: 50px;
padding-left: 50px;
padding-bottom: 30px;
 padding-top: 30px;
 
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
  background-color: black;
  width: 350px;
  position: relative;
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
 font-size: 40px;
 font-family: 'Raleway', sans-serif;
 text-shadow: 1px 1px 2px white, 0 0 1em blue, 0 0 0.2em #cc5200;
 font-weight: 800;
 margin: 20px;
 text-align: center;
`;

const Details = styled.h6`
 color: white;
 margin-bottom: 20px;
 font-family: 'Raleway', sans-serif;
`;

const NewArrivals = () => {

    const [allData, setAllData] = useState([]);

   

    const getData= async()=> {
      const res = await axios.get("http://127.0.0.1:8000/api/garments");
      setAllData(res.data);
       
      }
       
    
   
    useEffect(() => {
     getData()
   }, []);
  return (
    <div>
        <Container fluid style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px', marginBottom:'45px'}} >
        <Title>New Arrivals</Title>
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
    </Container>
    </div>
  )
}

export default NewArrivals
