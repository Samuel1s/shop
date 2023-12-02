import Stripe from "stripe";

const stripe_scret_key: string = process.env.STRIPE_SECRET_KEY ?? ""

export const stripe = new Stripe(stripe_scret_key, {
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'Ignite Shop',
  }
})