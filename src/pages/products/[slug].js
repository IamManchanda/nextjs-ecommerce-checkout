import { Fragment } from "react";
import Image from "next/image";
import { gql } from "graphql-request";
import graphCmsClient from "../../utils/graph-cms-client";

export async function getStaticPaths() {
  const { products } = await graphCmsClient.request(
    gql`
      query GetProductPageBySlugs {
        products {
          slug
        }
      }
    `,
  );

  return {
    paths: products.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } = {} }) {
  const { product } = await graphCmsClient.request(
    gql`
      query GetProduct($slug: String!) {
        product(where: { slug: $slug }) {
          id
          name
          slug
          description
          price
          images {
            id
            url
            width
            height
          }
        }
      }
    `,
    {
      slug,
    },
  );

  return {
    props: {
      product,
    },
    revalidate: 3,
  };
}

function ProductPageBySlug({ product }) {
  const { id, name, slug, description, price, images } = product;
  console.log({ id, name, slug, description, price, images });
  return (
    <Fragment>
      <h1>{name}</h1>
      {images.map(({ id, url, width, height }) => (
        <Image key={id} src={url} width={width} height={height} />
      ))}
    </Fragment>
  );
}

export default ProductPageBySlug;
