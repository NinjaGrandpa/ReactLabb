import React from 'react'
import ReactDOM from 'react-dom/client'

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme();

import Scrap from './Scrap'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Scrap className="Scrap"/>
    </ThemeProvider>
  </React.StrictMode>,
)