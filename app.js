const express = require("express");
const path = require("path");
const helmet = require("helmet");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: [
        "'self'",
        "https://api.openweathermap.org",
        "https://api.opencagedata.com",
      ],
      scriptSrc: ["'unsafe-inline'", "'self'", "https://cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      workerSrc: ["'self'", "blob:"],
      objectSrc: [],
      imgSrc: [
        "'self'",
        "blob:",
        "data:",
        "https://images.pexels.com",
        "https://openweathermap.org",
      ],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
    },
  })
);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/meteo", (req, res) => {
  const geometry = req.query;
  if (geometry.lat && geometry.lng) {
    res.render("meteo", { geometry });
  } else {
    res.redirect("/");
  }
});
app.get("/ma-position", (req, res) => {
  res.render("ma-position");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
