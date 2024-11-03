import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Checkout() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = { barcodeLogout: data.get('Logoff') };

   

    fetch("http://localhost:3333/LogOut", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
      if(data.status === 'ok'){
        alert('Logoff success')
        window.location = '/album'
      } else {
        alert('Logoff failed')
      }
    })

    .catch((error) => {
      console.error('Error', error)
    });
  };
  fetch("http://localhost:3333/deleteLastRow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  })
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Book
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name="Logoff"
              required
              fullWidth
              id="studentID"
              label="Student ID"
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
