import { GraphQLClient } from "graphql-request";

const graphCmsClientWithStripeAuth = new GraphQLClient(
  process.env.GRAPH_CMS_API_URL,
  {
    headers: {
      Authorization: `Bearer ${process.env.GRAPH_CMS_STRIPE_WEBHOOK_TOKEN}`,
    },
  },
);

export default graphCmsClientWithStripeAuth;
