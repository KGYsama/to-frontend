import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';



function Album() {
  const token = localStorage.getItem('token');
  const [imageSrc, setImageSrc] = useState('');
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/authen`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response => response.json())
    .then(data => {
      if(data.status === 'ok'){
        //alert('Authorization success');
      } else {
        alert('Authorization failed');
        localStorage.removeItem('token');
        window.location = '/Login';
      }
    })        
    .catch((error) => {
      console.error('Error', error);
    });
    
  },[token]);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location = '/Login';
  };

  const handlecheckout = (event) => {
    event.preventDefault();
    window.location = '/checkout';
  };

const handleBook = (event) => {
    event.preventDefault();
    window.location = '/booked';
  };

  const handleViewImage = () => {
    setOpen(true);
    setImageSrc("https://scontent.xx.fbcdn.net/v/t1.15752-9/438231963_7484704144955458_3854484036120153472_n.png?stp=dst-png_p206x206&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=eDDTrMNJ5UMAb6qs4v7&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QGohNDe_ECJSKqjEFyztYuQGE9u0RdMwbP2FgTA8we_tQ&oe=665523B3https://scontent.xx.fbcdn.net/v/t1.15752-9/438231963_7484704144955458_3854484036120153472_n.png?stp=dst-png_p206x206&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=eDDTrMNJ5UMAb6qs4v7&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QGohNDe_ECJSKqjEFyztYuQGE9u0RdMwbP2FgTA8we_tQ&oe=665523B3");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [status, setStatus] = useState('');
  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}/${month}/${date}`;
  }
  useEffect(() => {
    
      fetch(`${process.env.REACT_APP_API_URL}/barcode/getCheck`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingcheck: getDate() }),
      })
      .then(response => response.json())
      .then(data => {
        setStatus(data.status);
      })
      .catch((error) => {
        console.error('Error', error)
      });
    
  
    // เรียกใช้ fetchData ทุกๆ 5 วินาที
    
  
    // ทำความสะอาดออบเจ็กต์ interval เมื่อ component ถูกถอดจาก DOM
    return 
  }, []);


  

  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <AppBar position="relative" sx={{ bgcolor: 'orange' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" color="inherit" noWrap>
            Table selection
          </Typography>  

          <Button variant="contained" onClick={handlecheckout} 
          sx={{ bgcolor: 'white', color: 'red' }}>checkout</Button>

          <Button variant="contained" onClick={handleLogout} 
          sx={{ bgcolor: 'white', color: 'black' }}>LOG OUT</Button>  
          
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ pt: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                  }}
                  image="https://webapi.furinbox.com/media/catalog/product/cache/29b3f741dcafc528943c644b5c704259/4/0/400000274_c_Champ_Mo1_60cm_LW.JPG"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" sx={{ marginBottom: 2 }}>
                  Table 1
                  <Button variant="outlined" sx={{ bgcolor: 'white', color: 'black', marginLeft: 3 }}>
                  {status === 'ok' ? 'Available' : status === 'exists' ? 'Booked' : ''}
                  </Button>
                </Typography>                  
                  <Typography>
                    นี่คือโต๊ะมหัศจรรย์
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handleViewImage}>View</Button>
                  <Button size="small" onClick={handleBook}>book</Button>
                </CardActions>
              </Card>
            </Grid>
            {/* Add more Grid items for additional cards as needed */}
          </Grid>
        </Container>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
  sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600, // ปรับขนาดความกว้างของ Box ตามต้องการ
    maxWidth: '100%', // ให้ Box ไม่เกินขนาดที่กำหนด
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }}
>
  <CardMedia
    component="img"
    sx={{ maxHeight: 600, maxWidth: '100%' }} // กำหนดความสูงสูงสุดและความกว้างสูงสุดของรูปภาพ
    image={imageSrc}
    alt="Selected Image"
  />
  <Button onClick={handleClose}>Close</Button>
</Box>

        </Modal>
      </main>
    </ThemeProvider>
  );
}

export default Album;
