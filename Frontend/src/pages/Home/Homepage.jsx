
import './Homepage.css'
import Header from '../../Componenet/Header'
// import { products } from '../../data/products'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLoaderData } from "react-router";
import { formatMoney } from '../../utils/money';
import ProductGrid from './ProductGrid';

function Homepage({cart}) {
  const [products,setProducts] = useState([])

  // useEffect(()=>{
  //   axios.get('http://localhost:3000/api/products')
  // .then((response)=>{
  //   console.log(response.data);
  //   setProduct(response.data)
  // })
  // },[])

  const [loading, setLoading] = useState(true)

useEffect(() => {
  axios
    .get('/api/products')
    .then((response) => {
      setProducts(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      setLoading(false)
    })
}, [])

if (loading) {
  return <div>Loading...</div>
}

  return (
    
    <>
    <title>Ecommerce</title>
    <Header cart={cart}/>
    <div className="home-page">

      <ProductGrid products={products} />

    </div>
    </>
  )
}

export default Homepage