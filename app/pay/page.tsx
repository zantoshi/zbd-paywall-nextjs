import PollingComponent from '@/components/PollingComponent';
import { QR } from '@/components/QR';

const host = process.env.HOST_DOMAIN

export default async function Buy() {
  const res = await fetch(`${host}/api/charges`, {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify({
      amount: `1000`,
      description: 'Pay me now!',
      expiresIn: 300,
      callbackUrl: `${host}/callback`
    }),
  });
  const response = await res.json();
  const { success, data } = response;

  return (
    <div className="flex min-h-screen flex-col items-center p-96">
      <p>Pay Charge</p>
      <QR value={data.invoice.uri} />
      <PollingComponent id={data.id} />
      <a href={data.invoice.uri}>Open in Wallet</a>
    </div>
  )
}