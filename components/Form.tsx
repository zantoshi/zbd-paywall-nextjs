"use client";
// Validation Library
import { z, ZodType } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation';

type FormData = {
    amount : number,
    refundAddress : string,
    firstAddress : string,
    secondAddress : string
}

export default function From() {

    const router = useRouter()
    
    const schema: ZodType<FormData> = z.object({
        amount : z.number().min(2000),
        // Selected the email validation since ln addresses look pretty much the same
        refundAddress : z.string().email(),
        firstAddress : z.string().email(),
        secondAddress : z.string().email()
    })
    
    const {register, handleSubmit, formState : {errors}} = useForm<FormData>({resolver : zodResolver(schema)})

    const submit = (data: FormData) => {
        let href : string = `/confirm?amount=${data.amount}&refundAddress=${data.refundAddress}&firstAddress=${data.firstAddress}&secondAddress=${data.secondAddress}`
        router.push(href)
    }

    return <form onSubmit={handleSubmit(submit)} className="w-fluid text-white py-8">
        <div className="my-10">
            <h2 className="text-xl font-semibold">Amount:</h2>
            <label className="font-extralight">How much do you want to be sent in total? The amount will be splitted evenly between the two addresses.</label>
            {errors.amount && <span className='text-red-500 px-2'>{errors.amount.message}</span>}
            <input type="number" className="transition eas-in duration-100 w-full bg-secondblue p-4 my-2" placeholder='amount in milisats' required {...register("amount", {valueAsNumber : true})}/>
        </div>
        <div className="my-10">
            <h2 className="text-xl font-semibold">Refund Lightning Address:</h2>
            <label className="font-extralight">If payment Fails, we&apos;ll refund you at this address.</label>
            {errors.refundAddress && <span className='text-red-500 px-2'>{errors.refundAddress.message}</span>}
            <input type="text" className="transition eas-in duration-100 w-full bg-secondblue p-4 my-2" placeholder="sample@zbd.gg" required {...register("refundAddress")}/>
        </div>
        <div className="my-10">
            <h2 className="text-xl font-semibold">Pay to Lightning Addresses:</h2>
            {errors.firstAddress && <span className='text-red-500 px-2'>{errors.firstAddress.message}</span>}
            <input type="text" className="transition eas-in duration-100 w-full bg-secondblue p-4 my-2 border focus:border-solid focus:border-blue-500 focus:outline-none" placeholder="sample@zbd.gg" required {...register("firstAddress")}/>
            {errors.secondAddress && <span className='text-red-500 px-2'>{errors.secondAddress.message}</span>}
            <input type="text" className="transition eas-in duration-100 w-full bg-secondblue p-4 my-2 border focus:border-solid focus:border-blue-500 focus:outline-none" placeholder="sample@zbd.gg" required {...register("secondAddress")}/>
        </div>
        <input type="submit" value="Continue" className="transition eas-in duration-100 w-full p-5 bg-green rounded-lg cursor-pointer hover:bg-blue-hover "/>
    </form>
}