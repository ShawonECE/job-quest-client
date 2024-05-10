import { Outlet } from "react-router-dom"

function App() {
  
  return (
    <div>
      <div className="container mx-auto px-4">
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default App
