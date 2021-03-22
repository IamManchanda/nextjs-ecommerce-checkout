import createCheckoutSession from "../../controllers/checkout-session/create";

async function checkoutSession(req, res) {
  switch (req.method) {
    case "GET":
      res.status(200).json({
        message: "OK",
      });
      break;
    case "POST":
      try {
        const session = await createCheckoutSession(req);
        res.status(201).json({
          message: "Created",
          data: session,
        });
      } catch (error) {
        res.status(500).json({
          message: "Something went wrong!",
        });
      }
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}

export default checkoutSession;
