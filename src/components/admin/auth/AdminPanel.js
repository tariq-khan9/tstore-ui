import React from 'react'
import { Grid, Card, Tabs, Typography, Tab, Box } from '@mui/material';
import { useState } from 'react';
import '../../admin/Sidebar.css'
import AllUsers from './AllUsers';
import ModifyAdmin from './ModifyAdmin';
import AdminRegistration from './AdminRegistration';

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
  const AdminPanel = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    }
    return <>
      <Grid container className='login-margin'>
     
        
          <Card sx={{ width: '100%', height: '100%', mt: '20px' }}>
            <Box sx={{ mx: 3}}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} textColor='secondary' indicatorColor='secondary' onChange={handleChange}>
                  <Tab label='All Users' sx={{ textTransform: 'none', fontWeight: 'bold' }}></Tab>
                  <Tab label='Add New Admin' sx={{ textTransform: 'none', fontWeight: 'bold' }}></Tab>
                  <Tab label='Modify Admin' sx={{ textTransform: 'none', fontWeight: 'bold' }}></Tab>
                  
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
              <AllUsers/>
              </TabPanel>
              <TabPanel value={value} index={1}>
              <AdminRegistration/>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <ModifyAdmin/>
              </TabPanel>
             
            </Box>
            
          </Card>
        </Grid>
      
    </>;
  };
  

export default AdminPanel
