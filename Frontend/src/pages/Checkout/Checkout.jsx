import React from 'react'
import './checkout.css'
import CheckHead from './CheckHead'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { formatMoney } from '../../utils/money';
import dayjs from 'dayjs'
import OrderSummary from './OrderSummary';
import PaymentSummary from './PaymentSummary';

function Checkout({cart}) {
  const [deliveryOptions,setDeliveryOptions] = useState([])
  const [paymentSummary,setpaymentSummary] = useState(null)
  useEffect(()=>{
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
    .then((response)=>{
      setDeliveryOptions(response.data)
    })

    axios.get('/api/payment-summary')
    .then((response)=>{
      setpaymentSummary(response.data)
    })
  },[])
  return (
    <>
    <title>Checkout</title>
    <CheckHead cart={cart}/>

    <div className="checkout-page">
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
        <OrderSummary deliveryOptions={deliveryOptions} cart={cart} />

        <PaymentSummary paymentSummary={paymentSummary} />
      </div>
    </div>
    </>
  )
}

export default Checkout