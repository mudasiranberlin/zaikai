import React, { useState } from 'react'
import { formatMoney } from '../../utils/money'
import axios from 'axios'
import Product from './Product'


function ProductGrid({products,loardCart}) {
  return (
    <>
    <div className="products-grid">
        {
          products.map((product)=>{
            return(
              <Product key={product.id} product={product} loardCart={loardCart} />
            )
            
          })
        }
      </div>
    </>
  )
}

export default ProductGrid