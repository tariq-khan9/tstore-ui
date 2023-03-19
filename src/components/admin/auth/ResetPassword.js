import { Grid, TextField, Button, Box, Alert } from "@mui/material";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from "../../../services/userAuthApi";


const ResetPassword = () => {
  const navigate = useNavigate()
  const {token} = useParams()
  const [resetPassword] = useResetPasswordMutation();
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      password: data.get('password'),
      password_confirmation: data.get('password_confirmation'),
    }
    if (actualData.password && actualData.password_confirmation) {
          if (actualData.password === actualData.password_confirmation) {
            const res = await resetPassword({actualData, token});
            console.log(res);
              if(res.data.status==='success'){
                document.getElementById('password-reset-form').reset()
                setError({ status: true, msg: "Password Reset Successfully. Redirecting to Login Page...", type: 'success' })
                setTimeout(() => {              navigate("/login")            }, 3000)
              }
              else 
              {
                setError({ status: true, msg: "Token is invalid or Expired, Kindly resend your Email", type: 'error' })
              }

          } 
          else {
            setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: 'error' })
          }
    }
    else {
        setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }
  }
  return <>
    <Grid container justifyContent='center'>
      <Grid item lg={6} sm={6} sx={{display: { xs: 'none', sm: 'block' }}}>

      </Grid>
      <Grid item sm={6} xs={12}>
        <Box sx={{ color: '#0088cc'}}> <h1>Reset Password</h1></Box>
       
        <Box component='form' noValidate sx={{ mt: '0px', marginRight: '40px' }} id='password-reset-form' onSubmit={handleSubmit}>
          <TextField size="small" margin='normal' required fullWidth id='password' name='password' label='New Password' type='password' />
          <TextField size="small" margin='normal' required fullWidth id='password_confirmation' name='password_confirmation' label='Confirm New Password' type='password' />
          <Box textAlign='center'>
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Save</Button>
          </Box>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
        </Box>             
      </Grid>
    </Grid>
  </>;
};

export default ResetPassword;
