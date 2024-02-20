"use client";
import { useRouter } from 'next/router';

import { parse } from 'url';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


export default function PaymentStatus({...params}) {
   const [paymentResult, setPaymentResult] = useState('');
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
        var isSuccess = res.data.data.IsSuccess;
        if (isSuccess == true)
            setPaymentResult('Success Payment');
        else
            setPaymentResult('Failed Payment');

    }
  })



  return (
    <main className="flex min-h-screen flex-col items-center gap-[50px] p-24">
      <h1 className='font-bold text-2xl'>Payment Status</h1>
        <p>{paymentResult}</p>
    </main>
  );
}

