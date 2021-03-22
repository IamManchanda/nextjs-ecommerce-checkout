function PayBtn({ slug }) {
  async function handleClick(event) {
    event.preventDefault();
    const session = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug,
      }),
    });
  }

  return <button onClick={handleClick}>Pay</button>;
}

export default PayBtn;
