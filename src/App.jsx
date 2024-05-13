import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from './components/Footer';

function App() {
  
  return (
    <div className="dark:bg-[#2C3333]">
      <div className="container mx-auto px-4">
        <NavBar></NavBar>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App
