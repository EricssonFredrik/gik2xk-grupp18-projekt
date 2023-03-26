import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgb(224, 224, 224)'
    },
    secondary: {
      main: '#9ed46b',
      contrastText: '#0f4c13'
    }
  },
  typography: {
    fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: 'Lobster',
      fontSize: '3.7rem',
      color: 'rgb(224, 224, 224)'
  
    },
    h2: {
      fontSize: '2.1rem',
      marginBottom: '.7em'
    },
    h3: {
      fontSize: '1.6rem'
    },
    h4: {
      fontSize: '1.3rem',
      color: 'rgb(224, 224, 224)'
    }
  }
});
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);