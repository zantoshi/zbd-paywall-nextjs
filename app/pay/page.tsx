import PollingComponent from '@/components/PollingComponent';
import { QR } from '@/components/QR';

export default async function Buy() {
  const callback = `${process.env.HOST_DOMAIN}/callback`

  const res = await fetch(`${process.env.HOST_DOMAIN}/api/charges`, {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify({
      amount: '1000',
      description: 'Pay me now!',
      expiresIn: 300,
      callbackUrl: String(callback)
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