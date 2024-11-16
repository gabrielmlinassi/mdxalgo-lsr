const express = require("express");
const path = require("path");
const app = express();

const { server } = require("./src/server");
const { fetchLongShortRates } = require("./src/db");

var pessoas = [
  {
    nome: "Paulo",
    idade: 12,
  },
  {
    nome: "Jõao",
    idade: 15,
  },
  {
    nome: "Marina",
    idade: 25,
  },
];

const main = () => {
  server();

  app.set("view engine", "ejs");
  app.set("views", "./views");

  app.get("/", async (req, res) => {
    const longShortRates = await fetchLongShortRates();
    res.render("index", { longShortRates });
  });

  app.listen(8080, () => {
    console.log("Server successfully running on http://localhost:8080 \n\n");
  });
};

main();
