import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { gql } from "graphql-request";
import graphCmsClient from "../utils/graph-cms-client";

export async function getStaticProps() {
  const { products } = await graphCmsClient.request(
    gql`
      query GetProducts {
        products {
          id
          name
          slug
        }
      }
    `,
  );

  return {
    props: {
      products,
    },
    revalidate: 3,
  };
}

function PageIndex({ products }) {
  return (
    <Fragment>
      <Head>
        <title>Next.js eCommerce Checkout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Next.js eCommerce Checkout</h1>
      <ul>
        {products.map(({ id, name, slug }) => (
          <li key={id}>
            <Link href={`/products/${slug}`}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default PageIndex;
