import { Fragment } from "react";
import Image from "next/image";
import { gql } from "graphql-request";
import graphCmsClient from "../../utils/graph-cms-client";

function ProductPageBySlug({ product, slug }) {
  const { name, price, description, images } = product;
  return (
    <Fragment>
      <h1>
        {name} - €{price}
      </h1>
      <p>{description}</p>
      {images.map(({ id, url, width, height }) => (
        <Image key={id} src={url} width={width} height={height} />
      ))}
    </Fragment>
  );
}

export const getStaticPaths = async () => {
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
};

export const getStaticProps = async ({ params: { slug } = {} }) => {
  const { product } = await graphCmsClient.request(
    gql`
      query GetProduct($slug: String!) {
        product(where: { slug: $slug }) {
          name
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
      slug,
    },
    revalidate: 3,
  };
};

export default ProductPageBySlug;
