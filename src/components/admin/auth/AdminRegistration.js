import { TextField, Grid, Button, Box, Alert } from '@mui/material';
import { useState } from 'react';
import '../../admin/Sidebar.css'
import { useNavigate } from 'react-router-dom';
import { getToken, storeToken } from '../../../services/LocalAppStorage';
import { useRegisterUserMutation } from '../../../services/userAuthApi';
import { useRegisterAdminMutation } from '../../../services/adminAuthApi';

const AdminRegistration = () => {
    
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const navigate = useNavigate();
  const [registerAdmin] = useRegisterAdminMutation();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      password_confirmation: data.get('password_confirmation'),
      
    }
    if (actualData.name && actualData.email && actualData.password && actualData.password_confirmation ) {
      if (actualData.password === actualData.password_confirmation) {
        const res = await registerAdmin(actualData)
        if(res.data.status==='success'){
          setError({ status: true, msg: res.data.message, type: 'success' })
          storeToken(res.data.token)
          document.getElementById('registration-form').reset()
          
        }else
        {
          setError({ status: true, msg: res.data.message, type: 'error' })
        }
      } else {
        setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: 'error' })
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }
    
  }


  return <>
   <Grid lg={6} md={6} sm={8}>
    <Box component='form' noValidate sx={{ mt: 3 }} id='registration-form' onSubmit={handleSubmit}>
      <TextField color='secondary' size='small' margin='normal' required fullWidth id='name' name='name' label='Name' />
      <TextField color='secondary' size='small' margin='normal' required fullWidth id='email' name='email' label='Email Address' />
      <TextField color='secondary' size='small' margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      <TextField color='secondary' size='small' margin='normal' required fullWidth id='password_confirmation' name='password_confirmation' label='Confirm Password' type='password' />
      
      <Box textAlign='center'>
      <Button    type='submit' variant='contained' sx={{ mt: 3, mb: 2,  ':hover': {bgcolor:'#51146b', color:'#cbcbb3'}, bgcolor:'#7b1fa2', textTransform:'none', paddingLeft:'80px', paddingRight:'80px'}}>Register</Button>
      </Box>
      {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
    </Box>
    </Grid>
  </>;
};

export default AdminRegistration;
