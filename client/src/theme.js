import { createTheme } from '@mui/material/styles';

// Define a premium colour palette and typography
const theme = createTheme({
  palette: {
    primary: { main: 'hsl(210, 85%, 55%)' }, // teal‑blue primary
    secondary: { main: 'hsl(340, 78%, 60%)' }, // accent pink
    background: {
      default: 'hsl(0, 0%, 98%)',
      paper: 'hsl(0, 0%, 100%)',
    },
    text: {
      primary: 'hsl(210, 15%, 15%)',
      secondary: 'hsl(210, 10%, 45%)',
    },
  },
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
    h1: { fontWeight: 600 },
    button: { textTransform: 'none' },
  },
  shape: { borderRadius: 8 },
});

export default theme;
