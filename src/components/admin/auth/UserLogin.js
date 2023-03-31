import { TextField, Button, Box, Alert } from '@mui/material';

import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { storeToken, getType } from '../../../services/LocalAppStorage';
import { useLoginUserMutation } from '../../../services/userAuthApi';




const UserLogin = () => {
  const type = getType()
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password'),
    }
   try { 
    if (actualData.email && actualData.password) {
      const res =  await loginUser(actualData);
      console.log(res.data.token);
            if(res.data.status==='success'){
              setError({ status: true, msg: res.data.message, type: 'success' })
              storeToken(res.data.token, res.data.email, res.data.name, res.data.type)
              console.log(type)
              navigate('/')
            }
            else             {
              setError({ status: true, msg: "Provided credentials are incorrect", type: 'error' })
            }
          } 
      else
      {
        setError({ status: true, msg:"All fields are required", type: 'error' })
      } }
      catch(e){
        setError({ status: true, msg:"Server Connection Error!", type: 'error' })
      }
    
  }

  return <>
    <Box component='form' noValidate sx={{ mt: 1}} id='login-form' onSubmit={handleSubmit}>
      <TextField color='secondary' size='small' margin='normal' required fullWidth id='email' name='email' label='Email Address' />
      <TextField color='secondary' size='small' margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      <Box textAlign='center'>
      <Button    type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5, ':hover': {bgcolor:'#51146b', color:'#cbcbb3'}, bgcolor:'#7b1fa2', textTransform:'none', paddingLeft:'75px', paddingRight:'75px'}}>Login</Button>
      </Box>
      <NavLink style={{color:'#7b1fa2'}} to='/sendpasswordemail' >Forgot Password ?</NavLink>
      {error.status ? <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> : ''}
    </Box>
  </>;
};

export default UserLogin;
