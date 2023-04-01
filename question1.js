const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.get("/", function (req, res) {
  res.send("Hello World!");
});
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

  const { Configuration, OpenAIApi } = require("openai");

  const configiration = new Configuration({
    apiKey: "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",
  });

  runGPT35("how can you learn English");
});

app.listen(8080, function () {
  console.log("Server listening on port 8080!");
});
