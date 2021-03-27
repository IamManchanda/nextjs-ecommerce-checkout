import Stripe from "stripe";

const stripeServerClient = new Stripe(process.env.STRIPE_API_SECRET_KEY);

export default stripeServerClient;
