import Head from "next/head";
import { Fragment } from "react";

function PageCheckoutFailure() {
  return (
    <Fragment>
      <Head>
        <title>Payment Checkout Failure!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Payment Checkout Failure</h1>
      <p>
        Payment Checkout got failed, If you need support, please email:{" "}
        <a href="mailto:support@example.com" target="_blank">
          support@example.com
        </a>
        .
      </p>
    </Fragment>
  );
}

export default PageCheckoutFailure;
