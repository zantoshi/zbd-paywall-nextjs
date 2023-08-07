import { getZBD } from '@/services/zbd';
import { NextResponse } from 'next/server';

// export const dynamic = 'force-dynamic'

export async function POST(request: Request) {

  const data = await request.json()
  console.log(data)

  try {
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.log(error);
    // return NextResponse.json({ success: false, message: error.message });
    return NextResponse.json({ success: false });
  }
}
