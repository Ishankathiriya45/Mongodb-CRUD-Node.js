require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const path = require("path");
const clc = require("cli-color");
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/public", express.static(path.join(__dirname, "../public")));

app.use("/api", require("./router"));

const port = process.env["PORT_" + process.env.RUN_MODE];
app.listen(port, () => {
  console.log(
    `Your Application running on ${clc.yellow.underline(
      port
    )} in ${clc.yellow.underline(process.env.RUN_MODE)} Environment`
  );
});
