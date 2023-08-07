import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-96">
      Hello <Link href={'buy/'}>buy</Link> my content.
    </main>
  )
}
