import Link from "next/link"

export default async function Blog() {
  return (
    <div className="flex min-h-screen flex-col items-center py-40">
      <h1 className="text-white font-bold text-3xl">Payment Successfuly Splitted!</h1>
      <Link href='/' replace className="text-green text-lg underline py-10">Go back Home</Link>
    </div>
  )
}
