import QuoteTable from "./QuoteTable"
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import "./quoteTable.css";

export default function QuoteHistory() {
  
  const navigate = useNavigate()

  return (
    <div className="main-body"> 
      <nav>
        <header className = "navigation-bar">
            <Stack     direction= "row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={5}
            justifyContent="space-between"
            alignItems="center"
            >
                <Button variant="contained" onClick={() => { navigate("/Login"); }} endIcon={<ExitToAppIcon />}>
                  Log out
                </Button>
                <Button variant="contained"  onClick={() => { navigate("/Register"); }} color="warning" startIcon={<AccountBoxIcon />}>
                  Registration Settings
                </Button>
                <Button variant="contained"  onClick={() => { navigate("/QuoteForm"); }} color="success" endIcon={<RequestQuoteIcon />}>
                  New Fuel Quote
                </Button>
            </Stack>
        </header>
      </nav>
      <div className="wrapper">
        <div className="table">
          <QuoteTable className />
        </div>
        <footer className = "footer-main"> 
            <center><small>© 2023 All Rights Reserved. University of Houston. Department of Computer Science.</small></center>
        </footer>
      </div>
    </div>
  )
}


