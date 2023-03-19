import {  Card, Tabs, Tab, Box } from '@mui/material';
import { useState } from 'react';
import '../../admin/Sidebar.css'
import {Container, Row} from 'react-bootstrap';
import { AllProducts } from './AllProducts';
import AddProduct from './AddProduct';



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
const Products = () => {
 // const [open, setOpen] = useState(true);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return <>
    <Container className='h-100' fluid style={{marginTop:'70px', boxShadow:'none'}}> 
      <Row  lg={12} sm={12} xs={12} >
        <Card sx={{ width: '100%', height: '100%', mt: '0px', boxShadow:'none' }} >
          <div>
            <div >
              <Tabs  value={value} textColor='secondary'  indicatorColor='secondary' onChange={handleChange}>
                <Tab variant="scrollable"  label='All Products'  style={{minWidth:"25%"}} sx={{ textTransform: 'none', fontWeight: 'bold', fontSize:'15px' }}></Tab>
                <Tab label='Add New Product' style={{minWidth:"25%", height:'100%'}} sx={{ textTransform: 'none', fontWeight: 'bold', fontSize:'15px' }}> </Tab>
              </Tabs>
            </div>
            
            <TabPanel  value={value} index={0}>
            <Box style={{ overflowY:'auto', height:'520px', margin:'0px'}}>
                <AllProducts/>
                </Box>
            </TabPanel>
           
            
            <TabPanel value={value} index={1}>
            <Box sx={{marginTop:'60px', marginLeft:'60px', marginRight:'60px'}}>
              <AddProduct/>
              </Box>
            </TabPanel>
           
          </div>
          
        </Card>
      </Row>
      </Container>
  </>
};

export default Products;

