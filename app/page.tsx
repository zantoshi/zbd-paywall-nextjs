import Form from '@/components/Form'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className='text-white text-3xl font-bold'>Payment Splitting App</h1>
      <Form />
    </main>
  )
}
