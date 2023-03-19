import React from 'react'
import {Button} from '@mui/material'
import { getToken,removeToken, getEmail, getName } from '../../services/LocalAppStorage'
import {NavLink, Outlet, useNavigate} from 'react-router-dom'
import { useLogoutUserMutation } from '../../services/userAuthApi';
import './Sidebar.css'
import {Container, Row, Col, Card} from 'react-bootstrap'
import { FaDropbox } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { HiDocumentReport } from "react-icons/hi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import  Navbar  from '../Navbar';


const Dashboard = () => {

  const navigate = useNavigate()
  const [logoutUser] = useLogoutUserMutation();
  const token = getToken();

 
  const handleLogout = async () => {
    const res = await logoutUser({token});
    
      if(res.data.status==='success')
      {
        removeToken('token', 'email', 'name', 'type')
        navigate('/login')
      }
       
  }

  return (
    <div>
      <Navbar/>
       <Container fluid className='main-row my-margin' style={{overflowX:'hidden'}} >
        <Row >
         <Col lg={2}   xs={2} className=' sidebar ' >
          
              <ul className='nav flex-column' >
                <Card className='card'>
                <li className=''>
                 <a href='#' ><div className='d-flex align-items-end'><i style={{verticalAlign: 'center'}}><FaDropbox size={30}/></i><span className=' d-none d-xl-inline span' >Products</span></div></a>
                </li>
                </Card>
                <Card className='card'>
                <li className=''>
                 <a ><div className='d-flex align-items-end'><i style={{verticalAlign: 'center'}}><RiAdminFill size={30}/></i><span className=' d-none d-xl-inline span' >Admin</span></div></a>
                </li>
                </Card>
                <Card className='card' style={{marginBottom:'15px'}}>
                <li className=''>
                <a><div className='d-flex align-items-end'><i style={{verticalAlign: 'center'}}><HiDocumentReport size={30}/></i><span className=' d-none d-xl-inline span' ><Button>Reports</Button></span></div></a>
                </li>
                </Card>
                
                
                
              </ul>
              <div style={{color:'white', paddingLeft:'20px', paddingRight:'20px', marginTop:'25px'}}><hr /></div>
              <div  style={{height:'270px',  marginTop:'40px',paddingLeft:'7px',paddingRight:'5px', marginBottom:'10px', boxShadow: 'rgb(110, 0, 133) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(193, 7, 230, 0.752) 0px 1px 0px inset'}} className='  mx-3'>
                 <div style={{fontSize:'22px', color:'white', fontStyle:'italic', fontFamily:'fantasy',   paddingTop:'20px'}} className='d-none d-lg-block'>Welcome</div>
                 <div style={{fontSize:'24px',overflowWrap:'break-word', fontWeight:'bold', fontStyle:'oblique', fontFamily:'monospace', color:'#ff944d'}} className='d-none d-lg-block' >{getName()}</div>
                 
                 <div style={{fontSize:'20px', color:'white', fontStyle:'oblique', fontFamily:'monospace', fontWeight:'bold',  paddingTop:'20px'}} className='d-none d-xl-block'>Email:</div>
                 <div style={{fontSize:'16px', overflowWrap:'break-word',  fontStyle:'oblique', fontFamily:'monospace',  color:'#ff944d'}} className='d-none d-xl-block' >{getEmail()}</div>

                 <div >
                 <Button onClick={()=>{handleLogout()}}  disableRipple style={{textDecoration:'none'}} sx={{"&:hover": {textShadow: '2px 2px 4px #000000' } }} className='logout'><div className='logout pt-lg-0 pt-sm-5 pt-xs-5'><i style={{verticalAlign: 'center',  paddingLeft:'0px'}}><RiLogoutCircleRLine size={30}/></i><span className='d-none d-md-inline ' style={{paddingLeft:'7px',overflowWrap:'break-word'}} >Logout</span></div></Button>       
                 </div>
              </div>
          
         </Col>          
         <Col lg={10} xs={10} >
          <div style={{height:'430px',margin:'10px', marginBottom:'0px',maxHeight:'430px', Width:'1250px'}}>
          <Outlet/>
          </div>
         </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard
