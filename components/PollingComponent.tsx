"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface PollingComponentProps {
  id: string;
  data : FormData
}

type FormData = {
  amount : number,
  refundAddress : string,
  firstAddress : string,
  secondAddress : string
}

const PollingComponent = ({ id, data }: PollingComponentProps) => {
  const router = useRouter();
  const [status, setStatus] = useState<any>('');

  useEffect(() => {
    const fetchChargeStatus = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/charges/${id}`, {method : 'GET', cache: 'no-store'});
        const response = await res.json();
        setStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const pollInterval = setInterval(() => {
      fetchChargeStatus();
    }, 5000); // Poll every 5 seconds (adjust as needed)

    return () => clearInterval(pollInterval); // Clear interval on component unmount

  }, [id]); // Add 'id' to the dependency array to re-run the effect when 'id' changes.

  useEffect(() => {
    console.log(data)
    if (status === 'completed') {
      let sendData1 = {
        amount: data.amount / 2,
        lnAddress: data.firstAddress,
        comment: "Splitted Payment",
        callbackUrl : 'https://zbd-payment-app.vercel.app/callback'
      }
      fetch('https://api.zebedee.io/v0/ln-address/send-payment', {
        method : 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'apikey' : 'xupy43IyAMVRidH900wzAQMAaYTvgH5X'
        },
        body : JSON.stringify(sendData1)
      }).catch(err => console.log(err))

      let sendData2 = {
        amount: data.amount / 2,
        lnAddress: data.secondAddress,
        comment: "Splitted Payment",
        callbackUrl : 'https://zbd-payment-app.vercel.app/callback'
      }
      fetch('https://api.zebedee.io/v0/ln-address/send-payment', {
        method : 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'apikey' : 'xupy43IyAMVRidH900wzAQMAaYTvgH5X'
        },
        body : JSON.stringify(sendData2),
      }).catch(err => console.log(err))

      router.replace('/success');
    }
  }, [status, router]);

  return (
    <div>
      {status ? (
        <div>
          <p className='font-bold py-4 text-green'> Status: {status}</p>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default PollingComponent;
