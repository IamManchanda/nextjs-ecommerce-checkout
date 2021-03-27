import { GraphQLClient } from "graphql-request";

const graphCmsClient = new GraphQLClient(process.env.GRAPH_CMS_API_URL);

export default graphCmsClient;
