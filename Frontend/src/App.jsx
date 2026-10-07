import './App.css'
import { Route, Routes } from 'react-router'
import Homepage from './pages/Home/Homepage'
import Checkout from './pages/Checkout/Checkout'
import Orders from './pages/Order/Orders'
import Tracking from './pages/Tracking/Tracking'
import NotFound from './pages/Notfound/Notfound'
import { useEffect, useState } from 'react'
import axios from 'axios';
function App() {
  const [cart,setCart] = useState([])
  
  useEffect(()=>{
    axios.get('http://localhost:3000/api/cart-items?expand=product')
  .then((response)=>{
    console.log(response.data);
    setCart(response.data)
  })
  },[])
  return (

    <Routes>
      <Route index element={<Homepage cart= {cart}/>}></Route>
      <Route path='checkout' element={<Checkout cart= {cart}/>}></Route>
      <Route path='orders' element={<Orders cart= {cart} />}></Route>
      <Route path='tracking' element={<Tracking cart= {cart}/>}></Route>
      <Route path='*' element={<NotFound cart= {cart}/>}></Route>
      
    </Routes>
  )
}

export default App
