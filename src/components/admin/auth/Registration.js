import { TextField, FormControlLabel, Checkbox, Button, Box, Alert } from '@mui/material';
import { useState } from 'react';
import '../../admin/Sidebar.css'
import { useNavigate } from 'react-router-dom';
import { getToken, storeToken } from '../../../services/LocalAppStorage';
import { useRegisterUserMutation } from '../../../services/userAuthApi';

const Registration = () => {
  const [checked, setChecked] = useState(false);

  const handleChecked = () => {
    if(checked===false)
    {
      setChecked(true);
    }
    else
    {
      setChecked(false);
    }
  }
  
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      password_confirmation: data.get('password_confirmation'),
      tc: data.get('tc'),
    }
    if (actualData.name && actualData.email && actualData.password && actualData.password_confirmation && actualData.tc !== null) {
      if (actualData.password === actualData.password_confirmation) {
        const res = await registerUser(actualData)
        if(res.data.status==='success'){
          setError({ status: true, msg: res.data.message, type: 'success' })
          storeToken(res.data.token)
          document.getElementById('registration-form').reset()
          setChecked(false);
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
    <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
      <TextField color='secondary' size='small' margin='normal' required fullWidth id='name' name='name' label='Name' />
      <TextField color='secondary' size='small' margin='normal' required fullWidth id='email' name='email' label='Email Address' />
      <TextField color='secondary' size='small' margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      <TextField color='secondary' size='small' margin='normal' required fullWidth id='password_confirmation' name='password_confirmation' label='Confirm Password' type='password' />
      <FormControlLabel onClick={()=>{handleChecked()}}  checked={checked}  control={<Checkbox value={true} color="secondary" name="tc" id="tc" />} label="I agree to term and condition." />
      <Box textAlign='center'>
      <Button    type='submit' variant='contained' sx={{ mt: 3, mb: 2,  ':hover': {bgcolor:'#51146b', color:'#cbcbb3'}, bgcolor:'#7b1fa2', textTransform:'none', paddingLeft:'80px', paddingRight:'80px'}}>Join</Button>
      </Box>
      {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
    </Box>
  </>;
};

export default Registration;
