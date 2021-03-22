import Stripe from "stripe";

const stripeClient = new Stripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);

export default stripeClient;
