import { NextResponse } from "next/server"
const stripe = require('stripe')(process.env.NEXT_STRIPE_SECRET_KEY);

export const POST = async (request:any) => {

  const { products } = await request.json();

  console.log("here products", products)
      
  return NextResponse.json({
      test: true
  })
}