import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Button} from 'react-bootstrap';
import { Grid, IconButton, Tooltip,Box,Typography,Modal, TextField, Alert} from '@mui/material';
import { FaEdit } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";
import { MdDeleteForever} from "react-icons/md";

export const AllProducts = () => {
 
///////////////---------------////////////////-------------//////////////////////

const [error, setError] = useState({
  status: false,
  msg: "",
  type: ""
})
const [updateId, setUpdateId]= useState('');

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
function handleImageChange(e){
e.preventDefault()
setImage(e.target.files[0])
}



///////////////----------------////////////////////////---------------///////////////////
  const [tableData, setTableData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false); 
  const handleShow = () => setShow(true);
  const [rowData, setRowData] = useState([]);

  const handleDelete=()=>{
    try{
      axios.delete(`http://127.0.0.1:8000/api/products/${updateId}`).then((res)=>{ 
        console.log(res.data)                    
       });
       
      }
      catch(error){
        console.error(error.res.data);
      }
  }



  useEffect(()=>{
    getTableData();
   
  },[]);

  const getTableData=()=> {
    axios("http://127.0.0.1:8000/api/products").then((res)=>
    setTableData(res.data)
    
    );
   
  }
 /////////////////---------------Update Submit function start here-------------////////////////////////
 const handleSubmit = async(e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
 
try {
  if ( data.get('name')  && data.get('stock') && data.get('description') && data.get('price') !== null) {
    
      if(Number(data.get('price') && data.get('stock'))   && data.get('price')<=2000 ){               
        //   const imageData = new FormData()  
       
        const imageData = new FormData()               
        imageData.append('image', image)
        imageData.append('id', updateId)

      if (image && image.name.match(/\.(jpg|jpeg|png)$/) ){
        try{
          axios.post('http://127.0.0.1:8000/api/updateimage', imageData ).then((resImg)=>{                     
           });
           
          }
          catch(error){
            console.error(error.resImg.data);
          }
       }             
        
       const actualData = {
            stock: data.get('stock'),
            name: data.get('name'),           
            description: data.get('description'),
            price: data.get('price'),             
       }
         
          
        const res = await axios.patch(`http://127.0.0.1:8000/api/products/${updateId}`, actualData).then((res)=>{
           
            if(res.data.status==='success' ){
                setError({ status: true, msg: res.data.message, type: 'success' }) 
                setTimeout(() => {
                setShow(false);
                getTableData();
                
              }, 2000);  
              }  
             })             
          }
       else 
        {
            setError({ status: true, msg: "Stock and Price must be a number", type: 'error' })
        }
  } 
  else 
  {
    setError({ status: true, msg: "All Fields are Required", type: 'error'})
  }}
  catch(error){
    console.log(error)
  }
}

 /////////////////---------------Update Submit function Ends here-------------////////////////////////

  ////////////////------------Column fomator------------/////////////////

  const priceFormator =(data, row)=>{
    return <>
    Rs.{data}
    </>;
  };
  const imageFormator =(data, row)=>{
    return <>
    <img style={{height:'80px', width:'100px'}} src={data} class="img-fluid img-thumbnail" alt="Sheep"></img>
    </>;
  };
  const actionFormator=(data, row)=>{
  return <>
  <div>
  <Tooltip  title={<h6 style={{ color: "white" }}>Edit</h6>}><IconButton>
  <FaEdit onClick={()=>{ setRowData(row); setUpdateId(row.id); handleShow()}} style={{cursor:'pointer', color:'#0086b3', fontSize:'20px', marginTop:'10px', }}/>
  </IconButton></Tooltip>
  <RxDividerVertical style={{color:'#7b1fa2', fontSize:'35px', marginTop:'14px'}}/>
  <Tooltip  title={<h6 style={{ color: "white" }}>Delete</h6>}><IconButton>
  <MdDeleteForever onClick={()=>{ 
    const res = axios.delete(`http://127.0.0.1:8000/api/products/${row.id}`).then((res)=>{
      console.log(res.data);
      
      if(res.data.data.status==='success' ){
        alert("Product deleted successfully!");
        getTableData();
       
      }  
                                  })
                                }
                                  
                                }
                                  style={{cursor:'pointer',color:'#ff6600', fontSize:'27px', marginTop:'11px', }}/>
  </IconButton></Tooltip>
  </div>
  </>
  }
  const columns = [
    {
      text:"ID",
      dataField:"id",
      sort: true,
      editable:false,
   
    },
    
    {
      text:"Title",
      dataField:"name",
      sort: true
    },
    {
      text:"Category",
      dataField:"category",
      sort: true,
      editable:false
    },
    {
      text:"Stock",
      dataField:"stock"
    },
    {
      text:"Description",
      dataField:"description"
    },
    {
      text:"Image",
      dataField:"image_path",
      formatter: imageFormator,
      editable:false
     // Cell: ({row})=> <Image boxSize='80px' src={row.values.image_path}/>,
     },
     {
      text:"Price",
      dataField:"price",
      formatter: priceFormator
     // Cell: ({row})=> `Rs. ${row.values.price}`,
     },
     {
      text:"Action",
      formatter: actionFormator
     },
  ];


  return (
    <>   
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Grid  container 
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh', paddingTop:'30px'}}>

       <Box component='form'  onSubmit={handleSubmit} style={{backgroundColor:'white'}} noValidate sx={{width: 1/2 , mt: 1, px:4, border:3, borderColor: 'secondary.main' }} id='update-product-form' >
        <div style={{ justifyContent:'center'}} >{error.status ?  <Alert severity={error.type}  >{error.msg}</Alert> : ''}</div>
         <Typography style={{marginTop:'15px', textAlign: 'center', color:'#7b1fa2'}} ><h4>Update Product Record</h4></Typography>
            <Grid container spacing={4} direction="row" justifyContent="space-between">

              <Grid item lg={6} sm={6}  > 
                <TextField size='small' focused value={rowData.name} onChange={(e)=>{setRowData({name: e.target.value})}}   sx={{marginBottom: '20px', marginTop:'15px'}}  required fullWidth id='name' name='name' label='Product Name' />            
                <TextField size='small' focused value={rowData.stock} onChange={(e)=>{setRowData({stock: e.target.value})}}  sx={{marginBottom: '20px', marginTop:'15px'}}  required fullWidth id='stock' name='stock' label='Stock' />
                <TextField size='small' focused  helperText="price must be less then 2000" value={rowData.price} onChange={(e)=>{setRowData({price: e.target.value})}}  sx={{marginBottom: '20px', marginTop:'10px'}}  required fullWidth id='price' name='price' label='Price'  />
             </Grid>
             <Grid item lg={6} sm={6}>
                <TextField size='small' focused value={rowData.description} onChange={(e)=>{setRowData({description: e.target.value})}} sx={{marginBottom: '20px', marginTop:'15px'}}    multiline rows={4} required fullWidth id='description' name='description' label='Description' />
                <Typography style={{fontWeight:'bold', color:'#cc5200'}}>Change Image???</Typography>
                <input type="file" name='img' id='img' onChange={handleImageChange} required label='Change Image?'/>
                <TextField hidden value={updateId} id='uptid'/>
             </Grid>
           </Grid>
            <div style={{ justifyContent:'end', marginBottom:'25px'}}>
             <Button type='submit' style={{backgroundColor:'#7b1fa2', paddingLeft:'30px', paddingRight:'30px'}}  >Update</Button>
             
             <Button onClick={handleClose} style={{backgroundColor:'#e65c00',marginLeft:'20px',  paddingLeft:'35px', paddingRight:'35px'}} >Close</Button>
            </div>                   
         </Box>
        </Grid>
   </Modal>
   {/****************----------- Table starts here-----------**************************** */}
   <BootstrapTable 
      keyField='id' 
      data={tableData} 
      columns={columns} 
      striped='red'
      hover
      condensed
      pagination={paginationFactory()}
      cellEdit={cellEditFactory({
      mode: "dbclick",
    })}/>
    <Grid style={{marginBottom: '70px'}}></Grid>
  </>
  )
}
