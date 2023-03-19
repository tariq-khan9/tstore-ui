
import React, {useState, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../../src/services/userAuthApi';
import { getToken, getEmail, getType, removeToken} from '../services/LocalAppStorage'
import {Container, Row, Col, NavDropdown} from 'react-bootstrap'
import { Button, Paper, InputBase, Divider, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


const Navbar = () => {
  const navigate = useNavigate()
  const loginData = getToken()
  const loginEmail = getEmail()
  const userType = getType()
  const token = getToken()

  const [logoutUser] = useLogoutUserMutation();
  const handleLogout = async () => {
    const res = await logoutUser({token});
    
      if(res.data.status==='success')
      {
        removeToken('token', 'email', 'name', 'type')
        navigate('/login')
      }
       
  }
  

  const [isLogged, setIsLogged] = useState({
      link: '/login',
      text: 'Login/Registration'
  });

  useEffect(()=>{
    if(loginData){
      setIsLogged({
        link: '/dashboard',
        text: loginEmail
      })
    }
  },[loginData]); 

  const renderLoginComponent = () => {
        if (userType==='admin') {
            return <NavDropdown id="nav-dropdown" title="Dropdown" menuVariant="light">
                <NavDropdown.Item ><Button sx={{ textTransform:'none', padding:'0px', color:'#7b1fa2'}}>Dashboard</Button></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item ><Button sx={{ textTransform:'none', padding:'0px', color:'#7b1fa2'}}>Logout</Button></NavDropdown.Item>
              </NavDropdown>;
        } 
        if(userType==='user') 
        {
          return <NavDropdown style={{color:'white'}} id="nav-dropdown" color='secondary' title={loginEmail} menuVariant="light">
          <NavDropdown.Item ><Button onClick={()=>{handleLogout()}} sx={{ textTransform:'none', padding:'0px', color:'#7b1fa2'}}>Logout</Button></NavDropdown.Item>
        </NavDropdown>;
        }
        else{
          return <Button onClick={()=>{navigate('/login')}} sx={{ textTransform:'none', color:'white', ':hover': {color:'#b7b795'} }}>Login/Registration</Button>
        }
  };

  return (
    <div>
      
        <Container fluid className='fixed-top' style={{ boxShadow: '0 3px  15px  rgb(17, 5, 19)'}}>
          <Row>
            <Col lg={5} sm={6} xs={12} className='d-flex justify-content-start align-items-center'   style={{ backgroundColor:'#7b1fa2', height:'70px' }}>
               <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginLeft:'7px' }}
                  >
                   <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="What you looking for?"
                      inputProps={{ 'aria-label': 'whats you looking for' }}
                    />
                    <Divider sx={{ borderColor:'black' }} orientation='vertical' flexItem/>
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                      <SearchIcon />
                    </IconButton>                  
                  </Paper>
            </Col>

            <Col lg={4} sm={4} xs={6} className='d-flex justify-content-start align-items-center'   style={{ backgroundColor:'#7b1fa2', height:'70px'}}>
            <Button component={NavLink}  to='/'  ><div style={{color:'orange', fontSize:'20px',  paddingRight:'15px', paddingLeft:'15px',  boxShadow: 'rgba(255, 115, 0, 0.56) 0px 22px 70px 4px'}} className='mx-sm-0 mx-md-5'>T-Store</div></Button>
            </Col>

            <Col lg={3} sm={2} xs={6} className='d-flex justify-content-end align-items-center'   style={{ backgroundColor:'#7b1fa2', height:'70px' }}>
            
          {renderLoginComponent()}
            </Col>
            </Row>
        </Container>
     
    </div>
  )
}

export default Navbar
