import { getZBD } from '@/services/zbd';
import { NextResponse } from 'next/server';


export const dynamic = 'force-dynamic'

export async function GET(request: Request, data: any) {
  // Get zbd client
  const { zbd } = getZBD(NextResponse);
  const id = data.params.id;

  try {
    // Get Charge
    let result = await zbd.getCharge(id);

    // Returning JSON payload
    const response = NextResponse.json(result);

    // Set cache control headers to prevent caching
    response.headers.set('Cache-Control', 'no-store');

    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
