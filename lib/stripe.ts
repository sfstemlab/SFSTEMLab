import Stripe from 'stripe'



const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";

if (!process.env.STRIPE_SECRET_KEY) {
    console.log(`env variable not found: STRIPE_SECRET_KEY`)
}

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2025-06-30.basil'
})