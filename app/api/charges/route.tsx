import { getZBD } from '@/services/zbd';
import { NextResponse } from 'next/server'
 
export async function POST(request: Request) {
  const { zbd } = getZBD(NextResponse);

  try {
    // Deconstruct body
    const {
      amount,
      expiresIn,
      internalId,
      callbackUrl,
      description,
    } = await request.json(); 

    // Construct payload
    const payload = {
      amount,
      expiresIn,
      internalId,
      callbackUrl,
      description,
    }

    // Creating Charge / Payment Request
    const result = await zbd.createCharge(payload);

    // Returning JSON payload
    return NextResponse.json(result)

  } catch (error:any) {
    return NextResponse.json({ success: false, message: error.message })
  }
}