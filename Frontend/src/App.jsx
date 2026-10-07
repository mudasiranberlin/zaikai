import './App.css'
import { Route, Routes } from 'react-router'
import Homepage from './pages/Home/Homepage'
import Checkout from './pages/Checkout/Checkout'
import Orders from './pages/Order/Orders'
import Tracking from './pages/Tracking/Tracking'
import NotFound from './pages/Notfound/Notfound'
function App() {

  return (

    <Routes>
      <Route index element={<Homepage/>}></Route>
      <Route path='checkout' element={<Checkout/>}></Route>
      <Route path='orders' element={<Orders/>}></Route>
      <Route path='tracking' element={<Tracking/>}></Route>
      <Route path='*' element={<NotFound/>}></Route>
      
    </Routes>
  )
}

export default App
