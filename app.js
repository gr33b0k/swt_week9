export default (express, puppeteer) => {
  const app = express();

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,OPTIONS,DELETE",
    );
    res.setHeader("Access-Control-Allow-Headers", "ngrok-skip-browser-warning");
    next();
  });

  app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }

    next();
  });

  app.get("/login/", (req, res) => {
    res.type("text/plain").send("ee070797-87c0-4e75-88cc-ac99b3a3f744");
  });

  app.get("/test/", async (req, res) => {
    const url = req.query.URL;

    if (typeof url !== "string") {
      return res.status(400).type("text/plain").send("Missing URL");
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
      const page = await browser.newPage();

      await page.goto(url, {
        waitUntil: "networkidle2",
        timeout: 15000,
      });

      await page.click("#bt");

      await page.waitForFunction(() => {
        const input = document.getElementById("inp");
        return input && input.value !== "";
      });

      const value = await page.$eval("#inp", (input) => input.value);

      res.type("text/plain").send(value);
    } finally {
      await browser.close();
    }
  });

  app.all(/.*/, (req, res) => {
    res.type("text/plain").send("ee070797-87c0-4e75-88cc-ac99b3a3f744");
  });

  return app;
};
