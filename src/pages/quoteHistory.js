import QuoteTable from "./QuoteTable"
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function App() {
  
  return (
    <nav className="main-body"> 
      <nav>
        <header className = "navigation-bar">
            <Stack direction="row" spacing={2} >
                <Button variant="contained" /*onClick={}*/ >
                  Previous Page
                </Button>
                <Button variant="contained"  /*onClick={}*/ color="success" endIcon={<SendIcon />}>
                  New Fuel Quote
                </Button>
            </Stack>
        </header>
      </nav>
      <QuoteTable className />
      <footer className = "footer-main"> 
          <center><small>© 2023 All Rights Reserved. University of Houston. Department of Computer Science.</small></center>
      </footer>
    </nav>
  )
}

