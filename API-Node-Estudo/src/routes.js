//import express from "express";
const express = require("express");
const router = express.Router();
const userController = require("./controller/userController");
const postController = require("./controller/postController");
const authMiddlewares = require("./middlewares/authMiddlewares");
const apiExController = require("./controller/openWeatherController");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");
// import userController from "./controller/userController.js";
// import postController from "./controller/postController.js";
router.post("/user", userController.createUser);
router.post("/login", userController.login);
router.get("/users", authMiddlewares, userController.findAllUsers);
router.get("/user/:id", userController.findUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

router.post("/post/user/:id", postController.createPost);
router.get("/posts", postController.findAllPosts);
router.put("/post/:id", postController.updatePost);

router.use("/api_docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

router.get("/clima/:cidade/:uf", apiExController.useAPI);
module.exports = router;
