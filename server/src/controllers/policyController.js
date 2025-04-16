import fs from "fs/promises";

export const getPrivacyPolicy = async (req, res) => {
  try {
    const privacyPolicyHtml = await fs.readFile("privacy-policy.html", "utf8");
    res.setHeader("Content-Type", "text/html");
    res.send(privacyPolicyHtml);
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
    res.status(500).send("Internal Server Error");
  }
};
