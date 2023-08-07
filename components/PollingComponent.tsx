"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface PollingComponentProps {
  id: string;
}

const PollingComponent = ({ id }: PollingComponentProps) => {
  const router = useRouter();
  const [status, setStatus] = useState<any>('');

  useEffect(() => {
    const fetchChargeStatus = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/charges/${id}`, {cache: 'no-store'});
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
    if (status === 'completed') {
      router.push('/blog');
    }
  }, [status, router]);

  return (
    <div>
      {status ? (
        <div>
          <p> Status: {status}</p>
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
