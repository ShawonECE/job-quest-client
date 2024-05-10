import { Outlet } from "react-router-dom"

function App() {
  
  return (
    <div>
      <div className="container mx-auto px-4">
        Here is the root
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default App
