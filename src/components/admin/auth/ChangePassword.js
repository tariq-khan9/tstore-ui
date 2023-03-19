import { Box,TextField, Typography, Button, Alert } from '@mui/material';
import { useChangePasswordMutation } from '../../../services/userAuthApi';
import { getToken } from '../../../services/LocalAppStorage';
import { useState } from 'react';
const ChangePassword = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  });

  const [changePassword] = useChangePasswordMutation();
  const token = getToken()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
      password: data.get('new_password'),
      password_confirmation: data.get('confirm_password'),
      
    }
    if (actualData.password && actualData.password_confirmation) {
      if (actualData.password === actualData.password_confirmation) {
         changePassword({actualData, token});
        document.getElementById("change-password-form").reset();
        setError({ status: true, msg: "Password Changed Successful", type: "success" });
      } else {
        setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: "error" })
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: "error" })
    }
  };
  return <>
       <Box component='form'  noValidate sx={{ mt: 3, mx:15}} id='change-password-form' onSubmit={handleSubmit}>
          <Typography variant='h5' sx={{ color: '#7b1fa2', fontWeight: '500'}}>Change Password</Typography>
          <TextField color='secondary' size='small' margin='normal' required fullWidth id='new_password' name='new_password' label='New Password' type='password' />
          <TextField color='secondary' size='small' margin='normal' required fullWidth id='confirm_password' name='confirm_password' label='Confirm Password' type='password' />
          <Box textAlign='center'>
          <Button    type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5, ':hover': {bgcolor:'#51146b', color:'#cbcbb3'}, bgcolor:'#7b1fa2', textTransform:'none', paddingLeft:'75px', paddingRight:'75px'}}>Update</Button>
          </Box>
          {error.status ? <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> : ''} 
       
        </Box> 
  </>;
};

export default ChangePassword;
