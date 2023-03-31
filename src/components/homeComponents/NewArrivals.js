import {React, useState, useEffect} from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import  styled  from 'styled-components';
import pic1 from '../../img/garment1.jpg';

const Container1 = styled.div`

padding-right: 20px;
padding-left: 20px;
padding-bottom: 70px;
 padding-top: 60px;
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
  width: 320px;
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

    const staticData = [
      {
        id: 1,
        name: "Garment-1",
        price: 345,
        text: "Lorem Ipsum is not simply random text. It has roots in a piece of , making it over 2000 years old."
      },
      {
        id: 2,
        name: "Garment-2",
        price: 356,
        text: "Lorem Ipsum is not simply random text. It has roots in a piece of , making it over 2000 years old."
      },
      {
        id: 3,
        name: "Garment-3",
        price: 345,
        text: "Lorem Ipsum is not simply random text. It has roots in a piece of , making it over 2000 years old."
      },
      {
        id: 4,
        name: "Garment-4",
        price: 345,
        text: "Lorem Ipsum is not simply random text. It has roots in a piece of , making it over 2000 years old."
      }
      
    ]

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
      {staticData.map((item)=>(
        <CategoryItem key={item.id}>
          <Image src={pic1}/>
          <Info>
            <Title>{item.name}</Title>
            <Details>Price: {item.price}</Details>
            <Details>Description: {item.text}</Details>
          </Info>
        </CategoryItem>
      ))}
    </Container1>
    </Container>
    </div>
  )
}

export default NewArrivals
