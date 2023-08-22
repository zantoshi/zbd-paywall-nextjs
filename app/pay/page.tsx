'use client'

import PollingComponent from '@/components/PollingComponent';
import { QR } from '@/components/QR';
import React, {useEffect, useState} from 'react'

export default function Buy() {
  const callback = `${process.env.HOST_DOMAIN}/callback`

  const [response, setResponse] = useState({success : '', data : {invoice : {uri : ''}, id : ''}})

  useEffect(() => {
    fetch(`http://localhost:3000/api/charges`, {
      cache: 'no-store',
      method: 'POST',
      body: JSON.stringify({
        amount: '1000',
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
    <div className="flex min-h-screen flex-col items-center p-96">
      <p>Pay Charge</p>
      <QR value={response.data.invoice.uri} />
      <PollingComponent id={response.data.id} />
      <a href={response.data.invoice.uri}>Open in Wallet</a>
    </div>
  )
}