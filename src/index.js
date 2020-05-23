const http = require("http");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const config = require("./config");

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (origin) {
        console.log(origin, "===>Request origin");
        if (origin.includes("https://eu6vc.csb.app")) {
          return callback(null, true);
        }
        return callback(
          {
            status: 401,
            message: "You're violating CORS policy"
          },
          false
        );
      }
      callback(null, true);
    }
  })
);
app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

// const Joi = require("@hapi/joi");

app.get("/", (req, res) => res.json({ ping: "Server is healthy ;D" }));

app.use("/api", require("./api"));

app.use("*", (req, res) => res.status(404).json({ oops: "You're lost..." }));

app.use((err, req, res, next) => {
  console.log("Erroror occcurred", err);
  res.status(err.status).json(err);
});

http.createServer(app).listen(config.PORT);
