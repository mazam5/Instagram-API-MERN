export const getWebhook = (req, res) => {
  const hubMode = req.query["hub.mode"];
  const hubChallenge = req.query["hub.challenge"];
  const hubVerifyToken = req.query["hub.verify_token"];

  if (hubChallenge && hubVerifyToken) {
    res.status(200).send(hubChallenge);
  } else {
    res.send("<p>This is a GET Request, Hello Webhook!</p>");
  }
};

export const postWebhook = (req, res) => {
  const { object, entry } = req.body;

  if (object && entry) {
    console.log("Webhook received:", JSON.stringify(req.body, null, 2));
    res.status(200).send("Webhook received successfully");
  } else {
    res.status(400).send("Invalid webhook data");
  }
};
