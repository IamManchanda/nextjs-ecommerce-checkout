import { gql } from "graphql-request";
import stripeServerClient from "../../utils/stripe-server-client";
import graphCmsClient from "../../utils/graph-cms-client";

async function createCheckoutSession(req) {
  try {
    const { slug } = req.body;
    const { product } = await graphCmsClient.request(
      gql`
        query GetProduct($slug: String!) {
          product(where: { slug: $slug }) {
            name
            price
          }
        }
      `,
      {
        slug,
      },
    );
    const session = await stripeServerClient.checkout.sessions.create({
      success_url: "http://localhost:3000/?id={CHECKOUT_SESSION_ID}",
      cancel_url: `http://localhost:3000/products/${slug}`,
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            unit_amount: product.price,
            currency: "EUR",
            product_data: {
              name: product.name,
            },
          },
          quantity: 1,
        },
      ],
    });
    return session;
  } catch (error) {
    throw new Error();
  }
}

export default createCheckoutSession;
