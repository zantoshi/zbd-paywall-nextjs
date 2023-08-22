'use client'

import PollingComponent from '@/components/PollingComponent';
import { QR } from '@/components/QR';
import React, {useEffect, useState} from 'react'
import { useSearchParams } from "next/navigation";

type FormData = {
  amount : number,
  refundAddress : string,
  firstAddress : string,
  secondAddress : string
}

export default function Buy() {

  const callback = 'https://zbd-payment-app.vercel.app/callback'
  
  const params = useSearchParams()
  
  const [response, setResponse] = useState({success : '', data : {invoice : {uri : ''}, id : ''}})
  const [data, setData] = useState<FormData>({amount : 0, refundAddress: '', firstAddress : '', secondAddress : ''})

  useEffect(() => {
    const amount = params.get('amount')
    const refundAddress = params.get('refundAddress')
    const firstAddress = params.get('firstAddress')
    const secondAddress = params.get('secondAddress')
    setData({
      amount : parseFloat(amount!!), 
      refundAddress : refundAddress!!.toString(), 
      firstAddress : firstAddress!!.toString(), 
      secondAddress : secondAddress!!.toString()
    })

    fetch(`https://zbd-payment-app.vercel.app/api/charges`, {
      cache: 'no-store',
      method: 'POST',
      body: JSON.stringify({
        amount: amount,
        description: 'Pay me now!',
        expiresIn: 300,
        callbackUrl: String(callback)
      }),
    }).then(res => res.json()).then(res => {
      setResponse(res)
      console.log(res)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center p-10">
      <p className='text-white text-3xl font-bold'>Pay Charge</p>
      <QR value={response.data.invoice.uri} />
      <PollingComponent id={response.data.id} data={data}/>
      <a href={response.data.invoice.uri} className='text-white font-light'><span className='underline'>Open in Wallet</span></a>
    </div>
  )
}