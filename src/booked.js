import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';


const theme = createTheme();

export default function book() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      barcodePass: data.get('studentID'),
      bookingDate: data.get('booking')   
    } 
    // เรียก API เพื่อตรวจสอบว่ามีการจองในวันที่เลือกหรือไม่
    fetch(`${process.env.REACT_APP_API_URL}/barcode/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookingcheck: jsonData.bookingDate }),
    })
    .then(response => response.json())
    .then(data => {
      if(data.status === 'ok'){
        fetch(`${process.env.REACT_APP_API_URL}/barcode`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        })
        .then(response => response.json())
        .then(data => {
          if(data.status === 'ok'){
            alert('Book success')
            window.location = '/album'
          } else {
            alert('Book failed')
          }
        })
        .catch((error) => {
          console.error('Error', error)
        })
        fetch(`${process.env.REACT_APP_API_URL}/barcodeid`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify( {barcodeid: jsonData.barcodePass} ),
        })
        .catch((error) => {
          console.error('Error', error)
        })
      } else {
        // หากมีการจองในวันที่เดียวกันแล้ว แจ้งเตือนผู้ใช้
        alert('This date has already been booked. Please select another date.')
      }
    })

  };
  
 

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Book
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name="studentID"
              required
              fullWidth
              id="student ID"
              label="Student ID"
              sx={{ mb: 2 }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['booking']}>
                <DateField
                  name="booking"
                  label="Date"
                  defaultValue={dayjs('2024-04-25')}
                  format="YYYY-MM-DD"
                />
              </DemoContainer>
            </LocalizationProvider>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
