const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

const server = http.createServer(app);

app.get("/", function (req, res) {
  return res.status(200).send({ message: "HelloWorld" });
});

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: process.env.ORG_KEY,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/teststart", async function (req, res) {
  let userResponse = req.body;
  console.log(userResponse);

  const response = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: userResponse,
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log("error 발생");
      return e;
    });

  const data = response.data.choices[0].message.content;
  userResponse.push({
    role: "system",
    content: data,
  });
  console.log(data);

  return res.status(200).send(userResponse);
});

app.post("/test", function (req, res) {
  console.log(req.body);
  let userResponse = [...req.body];

  userResponse.push({
    role: "system",
    content:
      "알겠습니다. 질문을 시작합니다. 1. 개발자는 컴퓨터를 잘 다루는 사람인가요?",
  });

  return res.status(200).send(userResponse);
});

server.listen(8081, () => {
  console.log("Server listening on port 8081");
});
