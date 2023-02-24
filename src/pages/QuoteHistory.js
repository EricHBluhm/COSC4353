import QuoteTable from "./QuoteTable"

export default function QuoteHistory() {
  
  return (
    <nav className="main-body"> 
      <nav>
        <header className = "navigation-bar">
            <Button variant="contained" /*onClick={}*/ > New Fuel Quote </Button>
        </header>
      </nav>
      <QuoteTable className />
      <footer className = "footer-main"> 
          <center><small>© 2023 All Rights Reserved. University of Houston. Department of Computer Science.</small></center>
      </footer>
    </nav>
  )
}

