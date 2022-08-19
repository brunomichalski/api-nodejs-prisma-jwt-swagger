const express = require("express");
const app = express();
const router = require("../src/routes");
// import express from "express";
// import router from "../src/routes.js";
// const app = express();

app.use(express.json());
app.use(router);

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
