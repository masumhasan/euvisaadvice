import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as any,
})

// Initialize a supabase admin client to fetch package details securely
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(req: Request) {
  try {
    const { packageId, email } = await req.json()

    if (!packageId) {
      return NextResponse.json({ error: 'Package ID is required' }, { status: 400 })
    }

    // Fetch package details from Supabase
    const { data: pkg, error } = await supabase.from('packages').select('*').eq('id', packageId).single()

    if (error || !pkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    }

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(pkg.price * 100),
      currency: 'usd',
      receipt_email: email || undefined,
      metadata: {
        packageId: pkg.id,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (err: any) {
    console.error('Stripe payment error:', err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}
