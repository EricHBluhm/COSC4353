import QuoteTable from "./QuoteTable"
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import "./quoteTable.css";

export default function QuoteHistory() {
  
  const navigate = useNavigate()

  return (
    <nav className="main-body"> 
      <nav>
        <header className = "navigation-bar">
            <Stack direction="row" spacing={2} >
                <Button variant="contained" onClick={() => { navigate("/Login"); }} >
                  Log out
                </Button>
                <Button variant="contained"  onClick={() => { navigate("/QuoteForm"); }} color="success" endIcon={<SendIcon />}>
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

