import stripeWebClient from "../utils/stripe-web-client";

function PayBtn({ slug }) {
  async function handleClick(event) {
    event.preventDefault();
    const sessionResponse = await fetch("/api/checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug,
      }),
    });
    const session = await sessionResponse.json();
    const stripe = await stripeWebClient;
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }

  return <button onClick={handleClick}>Pay</button>;
}

export default PayBtn;
