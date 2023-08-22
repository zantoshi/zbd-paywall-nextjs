'use client'

import { useSearchParams, useRouter } from "next/navigation";
import {Suspense} from 'react'

export default function Confirm() {

    const params = useSearchParams()
    const amount = params.get('amount')
    const refundAddress = params.get('refundAddress')
    const firstAddress = params.get('firstAddress')
    const secondAddress = params.get('secondAddress')

    const router = useRouter()

    const confirm = () => {
        router.push('/pay')
    }

    const cancel = () => {
        router.replace('/')
    }

    return <div>
        <h1 className='text-white text-3xl font-bold py-5'>Confirm Payment</h1>
        <h2 className="text-white text-lg font-light">Let&apos;s review your payment split details and if it looks good, please pay your invoice on the next step and then we&apos;ll split your payment.</h2>

        <Suspense fallback={<Fallback />}>
            <div className="py-5">
                <h2 className="text-white text-lg font-bold">Refund Lightning Address:</h2>
                <h3 className="text-white text-base font-light py-2"><span className="mx-5">⚡</span>{refundAddress}</h3>
            </div>

            <div className="py-5">
                <h2 className="text-white text-lg font-bold">Pay to Lightning Addresses:</h2>
                <h3 className="text-white text-base font-light py-2"><span className="mx-5">⚡</span>{firstAddress}</h3>
                <h3 className="text-white text-base font-light py-2"><span className="mx-5">⚡</span>{secondAddress}</h3>
            </div>

            <div className="py-5">
                <h2 className="text-white text-lg font-bold">Amount per Lightning Addresses:</h2>
                <h3 className="text-white text-base font-light py-2"><span className="mx-5">⚡</span>{ parseFloat(amount!!) / 2 } sats (before network fees)</h3>
            </div>
        </Suspense>

        <div className="w-full flex-row py-5">
            <button className="w-2/5 bg-green p-5 text-white mr-10" onClick={confirm}>Confirm</button>
            <button className="w-2/5 bg-gray-200 p-5 " onClick={cancel}>Cancel</button>
        </div>
    </div>
}

function Fallback() {
    return <div>fallback</div>
}