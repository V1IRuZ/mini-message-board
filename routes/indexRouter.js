const { Router } = require("express");
const controller = require("../controllers/controller.js");
const indexRouter = Router();

indexRouter.get("/", controller.getMessages);
indexRouter.get("/new", controller.getNewUser);
indexRouter.get("/message", controller.getRedirectHome);
indexRouter.get("/message/:messageId", controller.getMessage);
indexRouter.post("/new", controller.postNewUser);
indexRouter.get("/{*splat}", controller.getInvalidRoute);

module.exports = indexRouter;
