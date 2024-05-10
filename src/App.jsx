import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"

function App() {
  
  return (
    <div>
      <div className="container mx-auto px-4">
        <NavBar></NavBar>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default App
