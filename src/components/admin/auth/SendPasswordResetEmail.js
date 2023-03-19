import { Grid, TextField, Button, Box, Alert } from "@mui/material";
import { useState } from 'react';
import '../../admin/Sidebar.css';
import { useSendResetEmailMutation } from "../../../services/userAuthApi";
const SendPasswordResetEmail = () => {
  const [sendResetEmail] = useSendResetEmailMutation();
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const handleSubmit = (e) => {
    
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
    }
    if (actualData.email) {
       sendResetEmail(actualData);
      document.getElementById('password-reset-email-form').reset()
      setError({ status: true, msg: "Password Reset Email Sent. Check Your Email !!", type: 'success' })
    } else {
      setError({ status: true, msg: "Please Provide Valid Email", type: 'error' })
    }
  }
  return <>
    <Grid container className="login-margin" justifyContent='center'>
      <Grid item lg={6} sm={6}  sx={{display: { xs: 'none', sm: 'block' }}}>

      </Grid>
      <Grid item lg={6} sm={6} xs={12} >
        <Grid style={{margin:'20px'}}>
      <Box sx={{ color: '#7b1fa2', marginTop:'10px'}}><h3>Password Forgot!</h3></Box>
        <Box component='form' noValidate sx={{ mt: 1, marginRight: '40px' }} id='password-reset-email-form' onSubmit={handleSubmit}>
          <TextField color="secondary" size="small" margin='normal' required fullWidth id='email' name='email' label='Email Address' />
          <Box textAlign='center'>
          <Button    type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5, ':hover': {bgcolor:'#51146b', color:'#cbcbb3'}, bgcolor:'#7b1fa2', textTransform:'none', paddingLeft:'75px', paddingRight:'75px'}}>Send</Button>
          </Box>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
        </Box>
        </Grid>
      </Grid>
    </Grid>
  </>;
};

export default SendPasswordResetEmail;
