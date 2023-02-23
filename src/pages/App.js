import QuoteTable from "./QuoteTable"

export default function App() {
  
  return (
    <nav className="main-body"> 
      <nav><header className = "navigation-bar"> Navigation control bar goes here</header></nav>
      <QuoteTable className />
      <footer className = "footer-main"> 
          <center><small>© 2023 All Rights Reserved. University of Houston. Department of Computer Science.</small></center>
      </footer>
    </nav>
  )
}

