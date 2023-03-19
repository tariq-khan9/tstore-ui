import { TextField, Button, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLoginAdminMutation} from '../../../services/adminAuthApi';
import { storeToken} from '../../../services/LocalAppStorage';

import { useDispatch,useSelector } from 'react-redux';
import { setLoggedInfo } from '../../../features/loggedSlice';

const AdminLogin = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const dispatch = useDispatch()
  const loggedInfo = useSelector(state=> state.loggedInfo)
  const navigate = useNavigate();
  const [loginAdmin]= useLoginAdminMutation();
  
 console.log(loggedInfo)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    if (actualData.email && actualData.password) {
      const res = await loginAdmin(actualData);
      if(res.data.status==='success'){
        setError({ status: true, msg: res.data.message, type: 'success' })
        storeToken(res.data.token, res.data.email);
        dispatch(setLoggedInfo({
          email: res.data.email,
          name: res.data.name0
        }))
       navigate('/admin-dashboard/admin')
     }
      else
      {
        setError({ status: true, msg: res.data.message, type: 'error' })
      }
    } 
    else
    {
      setError({ status: true, msg:"All fields are required", type: 'error' })
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

export default AdminLogin;
