import { Grid, Card, Tabs, Typography, Tab, Box } from '@mui/material';
import { useState } from 'react';
import '../../admin/Sidebar.css'
import { AppRegistration, ShoppingBag } from '@mui/icons-material';
import Registration from './Registration';
import AdminLogin from './AdminLogin';
import UserLogin from './UserLogin';

const TabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <div role='tabpanel' hidden={value !== index}>
      {
        value === index && (
          <Box>{children}</Box>
        )
      }
    </div>
  )
}
const LoginReg = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return <>
    <Grid container className='login-margin'>
      <Grid item lg={6} sm={6} sx={{
        mt: '30px' ,
        //backgroundImage: `url(${Pic1})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: '0.9',
        height: '70vh',
        display: { xs: 'none', sm: 'block' }
      }}>
      </Grid>
      <Grid item lg={6} sm={6} xs={12}>
        <Card sx={{ width: '90%', height: '96%', mt: '20px' }}>
          <Box sx={{ mx: 3, height: 500 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} textColor='secondary' indicatorColor='secondary' onChange={handleChange}>
                <Tab label='Login' sx={{ textTransform: 'none', fontWeight: 'bold' }}></Tab>
                <Tab label='Registration' sx={{ textTransform: 'none', fontWeight: 'bold' }}></Tab>
                <Tab label='Admin' sx={{ textTransform: 'none', fontWeight: 'bold' }}></Tab>
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
            <UserLogin/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Registration/>
            </TabPanel>
            <TabPanel value={value} index={2}>
            <AdminLogin/>
            </TabPanel>
          </Box>
          
        </Card>
      </Grid>
    </Grid>
  </>;
};

export default LoginReg;
