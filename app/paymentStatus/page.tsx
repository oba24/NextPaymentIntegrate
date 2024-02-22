"use client";
import { useRouter } from 'next/router';

import { parse } from 'url';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


export default function PaymentStatus({...params}) {
   const [paymentResult, setPaymentResult] = useState('');
   const [invoiceId, setInvoiceId] = useState('');
   const [CustomerEmail, setCustomerEmail] = useState('');
   const [CustomerMobile, setCustomerMobile] = useState('');
   const [CustomerName, setCustomerName] = useState('');
   const [ItemName, setItemName] = useState('');
   const [Quantity, setQuantity] = useState('');
   const [UnitPrice, setUnitPrice] = useState('');

   const { paymentId, Id } = params.searchParams;
   const data = {
        key: paymentId,
        KeyType: 'paymentId'
    }
   axios.post('/api/getPaymentStatus', {
    data: data
  },
  {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res => {
    if (res.status == 201)
    {
      console.log(res.data,'=================')
        var isSuccess = res.data.data.IsSuccess;
        if (isSuccess == true)
        {
          setPaymentResult('Success Payment');
          setInvoiceId(res.data.data.Data.InvoiceId);
          setCustomerEmail(res.data.data.Data.CustomerEmail);
          setCustomerMobile(res.data.data.Data.CustomerMobile);
          setCustomerName(res.data.data.Data.CustomerName);
          setItemName(res.data.data.Data.InvoiceItems[0].ItemName);
          setQuantity(res.data.data.Data.InvoiceItems[0].Quantity);
          setUnitPrice(res.data.data.Data.InvoiceItems[0].UnitPrice);
        }
        else
            setPaymentResult('Failed Payment');

    }
  })



  return (
    <main className="flex min-h-screen flex-col items-center gap-[50px] p-24">
      <h1 className='font-bold text-2xl'>Payment Status</h1>
        <p>{paymentResult}</p>
        {paymentResult === 'Success Payment' ? (
          <span>
            <p>Invoice ID: {invoiceId}</p>
            <p>Customer Name: {CustomerName}</p>
            <p>Customer Email: {CustomerEmail}</p>
            <p>Customer Mobile:{CustomerMobile}</p>
            <p>Item Name{ItemName}</p>
            <p>Quantity: {Quantity}</p>
            <p>UnitPrice: {UnitPrice}</p>
          </span>
          )
          :
          (<p>No Result</p>)
        }
    </main>
  );
}

