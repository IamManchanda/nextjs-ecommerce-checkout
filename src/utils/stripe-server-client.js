import Stripe from "stripe";

const stripeServerClient = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_API_SECRET_KEY,
);

export default stripeServerClient;
