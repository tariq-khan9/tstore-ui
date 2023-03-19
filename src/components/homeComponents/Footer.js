import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import  styled  from 'styled-components';
import { AiFillFacebook,   AiFillGooglePlusSquare, AiFillTwitterSquare, AiFillInstagram } from "react-icons/ai";
import { FaMapMarkerAlt} from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";



const Logo = styled.h1`
 flex: 1;
 color: white;
 font-family: Italianno, cursive;
 font-size: 50px;
 font-weight: 500;
 text-shadow: 5px 5px #7b1fa2;
`;
const Desc = styled.p`
font-family: 'Raleway', sans-serif;
text-justify: inter-word;
text-align: justify;
color:white;
`;

const SocialContainer = styled.div`

 flex: 1;
 display: flex;
 flex-direction: row;
 
`;

const SocialItem = styled.div`
margin-right: 10px;
&:hover{
    cursor: pointer;
}
`;


const ListContainer = styled.div`
 flex: 1;
 padding: 0;
 padding-left: 20px;
 margin: 0;
 flex-direction: row;
`;
const Title = styled.h3`
font-family: 'Raleway', sans-serif;
color: white;
 margin-left: 37px;
 margin-top: 0px;
`;

const ContactTitle = styled.h3`
font-family: 'Raleway', sans-serif;
 color: white;
 margin-left: 0px;
 margin-top: 0px;
`; 

const List = styled.ul`
 list-style: none;

 flex-wrap: wrap;
`;

const ListItem = styled.li`
font-family: 'Raleway', sans-serif;
font-size: 15px;
padding: 0px;
color: white;
 
 margin-left: 10px;
 &:hover{
    cursor: pointer;
    color: #b3b3b3;
    text-shadow: 1px 1px 2px #7b1fa2, 0 0 1em #7b1fa2, 0 0 0.2em #7b1fa2;
 }
`;

const ContactItem = styled.div`
 margin-top: 15px;
 margin-bottom: 0px;
 color: white;
 font-family: 'Raleway', sans-serif;
font-size: 15px;
`;


const Footer = () => {
  return (
    <Container fluid style={{backgroundColor:'#262626'}}>
        <Row>
      <Col lg={4} sm={4} style={{padding: '20px'}}>
        <Logo>T-Store</Logo>
        <Desc>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'.
        </Desc>
        <SocialContainer>
            <SocialItem>
            <AiFillFacebook size='40px' color='#1a75ff'/>
            </SocialItem>
            <SocialItem>
            <AiFillTwitterSquare size='40px' color='#00bfff'/>
            </SocialItem>
            <SocialItem>
            <AiFillGooglePlusSquare size='40px' color='#ff1a1a'/>  
            </SocialItem>        
        </SocialContainer>
      </Col>

      <Col lg={4} sm={4} className='px-lg-4' style={{padding: '0px', paddingTop:'20px'}}>
        <ListContainer>
        <Title>Useful Links</Title>
        <List>
            <Row><Col lg={4} sm={12}>
            <ListItem>Home</ListItem>
            <ListItem>Garments</ListItem>
            <ListItem>Watches</ListItem>
            <ListItem>Footwears</ListItem>
            </Col>
            <Col lg={4} sm={12}>
            <ListItem>Terms</ListItem>
            <ListItem>New Arrivals</ListItem>
            <ListItem>My Account</ListItem>
            
            </Col>
            </Row>
        </List>
        </ListContainer>
      </Col>
      <Col lg={4} sm={4} style={{padding: '20px', paddingTop:'20px', paddingRight:'130px'}}>
        <ContactTitle>Contact</ContactTitle>
        <ContactItem>
            <FaMapMarkerAlt size='20px' color='#ff751a'/> Peshawar Cantt, KPK, Pakistan.
        </ContactItem>
        <div style={{color:'white'}}><hr/></div>
        <ContactItem>
           <BsFillTelephoneFill size='18px' color='#ff751a'/> +9239834654999
        </ContactItem>
        <div style={{color:'white'}}><hr/></div>
        <ContactItem>
          <MdEmail size='20px' color='#ff751a'/>  contact@tstore.com
        </ContactItem>
      </Col>
      </Row>
    </Container>
  )
}

export default Footer
