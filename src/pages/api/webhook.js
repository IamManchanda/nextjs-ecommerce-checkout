import { gql } from "graphql-request";
import stripeServerClient from "../../utils/stripe-server-client";
import graphCmsClientWithStripeAuth from "../../utils/graph-cms-client-with-stripe-auth";

async function webhook(req, res) {
  const event = req.body;
  const session = await stripeServerClient.checkout.sessions.retrieve(
    event.data.object.id,
    {
      expand: ["line_items.data.price.product", "customer"],
    },
  );
  const line_items = session.line_items.data;
  const { customer } = session;

  const { order } = await graphCmsClientWithStripeAuth.request(
    gql`
      mutation CreateOrderMutation($data: OrderCreateInput!) {
        createOrder(data: $data) {
          id
          email
          total
        }
      }
    `,
    {
      data: {
        email: customer.email,
        total: session.amount_total,
        stripeCheckoutId: session.id,
        orderItems: {
          create: line_items.map((li) => ({
            quantity: li.quantity,
            total: li.amount_total,
            product: {
              connect: {
                slug: li.price.product.metadata.productSlug,
              },
            },
          })),
        },
      },
    },
  );

  res.json({
    message: "Success",
  });
}

export default webhook;
