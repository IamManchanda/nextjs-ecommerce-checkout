import { loadStripe } from "@stripe/stripe-js";

const stripeWebClient = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_API_PUBLISHABLE_KEY,
);

export default stripeWebClient;
