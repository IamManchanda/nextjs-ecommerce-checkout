import Head from "next/head";
import { Fragment } from "react";

function PageCheckoutSuccess() {
  return (
    <Fragment>
      <Head>
        <title>Thanks for your order</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Payment Checkout Success</h1>
      <p>
        We thank you for your order, If you have any questions, please email:{" "}
        <a href="mailto:orders@example.com" target="_blank">
          orders@example.com
        </a>
        .
      </p>
    </Fragment>
  );
}

export default PageCheckoutSuccess;
