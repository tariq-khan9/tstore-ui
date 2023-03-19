import React, {useState} from 'react'
import { Container } from 'react-bootstrap';
import  styled  from 'styled-components';
import cat1 from '../../img/garments.jpg';
import cat2 from '../../img/watches.jpg';
import cat3 from '../../img/footwear.jpg';
import Garments from './Garments';
import Watches from './Watches';

const Container1 = styled.div`
 
 width: 100%;
 display: flex;
 justify-content: space-between;
`;

const CategoryTitle = styled.div`
 font-size: 40px;
 font-family: 'Raleway', sans-serif;
 text-shadow: 1px 1px 2px white, 0 0 1em blue, 0 0 0.2em #cc5200;
 font-weight: 800;
 margin: 20px;
 text-align: center;
`;

const CategoryItem = styled.div`
  flex: 1;
  margin: 5px;
  height: 60vh;
  position: relative;
 background-color: black;
 
`;

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
opacity: 0.8;

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
   opacity: 1;
}
flex-direction: column;
justify-content: center;
align-items: center;
`;

const Title = styled.h1`
 color: white;
 margin-bottom: 20px;
 margin-top: 40px;
 text-shadow: 1px 1px 2px black, 0 0 1em #cc5200, 0 0 0.2em #cc5200;
`;

const Button = styled.button`
 border: none;
 padding: 10px;
 
 font-weight: 600;
 font-family: 'Raleway', sans-serif;
 opacity: 0.8;

`;

const Categories = () => {
  const [category, setCategory] = useState('garments');
  return (
    <>
    <Container fluid style={{backgroundColor:'white'}}>
    <CategoryTitle>Categories</CategoryTitle>
    <Container1>
      <CategoryItem>
        <Image src={cat1}/>
        <Info>
        <Title>Garments</Title>
        
        <Button onClick={()=>{setCategory('garments')}}>SHOW MORE</Button>
        </Info>
        
      </CategoryItem>
      <CategoryItem>
        <Image src={cat2}/>
        <Info>
        <Title>Watches</Title>
        
        <Button onClick={()=>{setCategory('watches')}}>SHOW MORE</Button>
        </Info>
      </CategoryItem>
      <CategoryItem>
        <Image src={cat3}/>
        <Info>
        <Title>Footwears</Title>
        
        <Button onClick={()=>{setCategory('garments')}}>SHOW MORE</Button>
        </Info>
      </CategoryItem>
    </Container1>
    </Container>
    <Container fluid style={{marginTop:'30px'}}>
    {category==='garments' && <Garments/>}
    {category==='watches' && <Watches/>}
    </Container>
    </>
  )
}

export default Categories
