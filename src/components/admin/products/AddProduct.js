import React, {useEffect, useState} from 'react'
import { TextField, Grid,Typography, MenuItem, InputLabel,FormControl, Button, Box, Alert } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

//import { useAddProductMutation } from '../../../services/productsApi';
import axios from 'axios';


export const AddProduct = () => {
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
     })


     useEffect(() => {
      const timeout = setTimeout(() => {
         setError({status: false,
          msg: "",
          type: ""});
       }, 3500);
      return () => clearTimeout(timeout);
     },[error]);


/////////////***************--------------this section handles image data-----------************///////////////     
    const [image, setImage] = useState('');  
    const [imageName, setImageName] = useState('');
    function handleImageChange(e){
      e.preventDefault()
      setImage(e.target.files[0])
     // console.log(e.target.files[0])
    }
    
/////////////***************--------------Category dropdown selection-----------************///////////////      
     const [category, setCategory] = useState('');
      const handleSelectChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
      };
    
////////////***************--------------Main function of form submit button-----------************///////////////       
      const handleSubmit = async(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
       
      try {
        if ( data.get('name') && data.get('category') && data.get('stock') && data.get('description') && data.get('price') !== null) {
          
            if(Number(data.get('price') || data.get('stock'))   && data.get('price')<=2000 ){               
                const imageData = new FormData()               
                 imageData.append('image', image)
                 console.log(imageData)
               if (!image || !image.name.match(/\.(jpg|JPG|jpeg|png)$/) ) {
                  setError({ status: true, msg: "Please upload an Image", type: 'error' });                  
                  return false;
                  }
               if (image && image.name.match(/\.(jpg|JPG|jpeg|png)$/) ){
                   axios.post('http://127.0.0.1:8000/api/image', imageData).then((resImg)=>{   
                       setImageName(`http://localhost:8000/images/products\\${resImg.data.name}`)          
                    });
                }
                
               const actualData = {
                  stock: data.get('stock'),
                  name: data.get('name'),
                  category: data.get('category'),
                  description: data.get('description'),
                  price: data.get('price'),
                  
                  image_path: imageName  
                    
                }
                
                const res = await axios.post('http://127.0.0.1:8000/api/products', actualData) 
                if(res.data.status==='success' ){
                    setError({ status: true, msg: res.data.message, type: 'success' })
                   // document.getElementById('add-product-form').reset()  
                   // setCategory('');      
                    //setImage('');    
                    //setImageName('')      
                    }      
                }
             else 
              {
                  setError({ status: true, msg: "Price must be a number and not more then 2000", type: 'error' })
              }
        } 
        else 
        {
          setError({ status: true, msg: "All Fields are Required", type: 'error'})
        }}
        catch(error){
          //setError({ status: true, msg: "Something went wrong", type: 'error' })
          console.log(error)
        }
      }

    
      return <>
     
        <Box component='form' noValidate sx={{ mt: 1 }} id='add-product-form' onSubmit={handleSubmit}>
        <Grid container spacing={4} direction="row"
                justifyContent="space-between"
                >
           <Grid item lg={6} sm={6}  >
             
             <TextField size='small'  sx={{marginBottom: '20px'}}  required fullWidth id='name' name='name' label='Product Name' />
             <FormControl fullWidth size="small"  sx={{marginBottom: '15px', marginTop:'10px'}} >
                <InputLabel id="demo-simple-select-label" >Category</InputLabel>
                 <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='category'
                    value={category}
                    label="Category"
                    onChange={handleSelectChange}
                    >
                    <MenuItem value={1}>Garments</MenuItem>
                    <MenuItem value={2}>Watches</MenuItem>
                    <MenuItem value={3}>Footwears</MenuItem>
                 </Select>
             </FormControl>
             <TextField size='small' sx={{marginBottom: '30px', marginTop:'15px'}}  required fullWidth id='stock' name='stock' label='Stock' />
             <TextField size='small'  sx={{marginBottom: '20px'}}  required fullWidth id='price' name='price' label='Price' />
           </Grid>

           <Grid item lg={6} sm={6}>
            <TextField size='small' sx={{marginBottom: '20px', marginTop:'0px'}}    multiline rows={4} required fullWidth id='description' name='description' label='Description' />
            <Typography style={{color:'#cc5200', fontSize:'18px',fontWeight:'bold'}}>Upload an Image Here</Typography>
            <input  type="file" name='img' onChange={handleImageChange} required label='Choose and Image'/>
          </Grid>
          
        </Grid>
          
          <Box textAlign='start'>
            <Button type='submit' variant='contained'  sx={{':hover': { bgcolor: '#cc5200', color:'white'},color:'white', bgcolor:'#7b1fa2', mt: 3, mb: 2, px: 4, py: 1}}>Add Product</Button>
            {error.status ?  <Alert severity={error.type} >{error.msg}</Alert> : ''}
           
          </Box>
         
        </Box>
      </>;
    
};

export default AddProduct;
