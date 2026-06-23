const { Router } = require("express");
const CustomNotFoundError = require("../errors/CustomNotFoundError.js");

const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
    id: 1,
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
    id: 2,
  },
];

indexRouter.get("/", (req, res) => {
  res.render("index", { messages: messages });
});

indexRouter.get("/new", (req, res) => {
  res.render("form");
});

indexRouter.get("/message", (req, res) => {
  res.redirect("/");
});

indexRouter.get("/message/:messageId", (req, res) => {
  const { messageId } = req.params;

  const message = messages.find((msg) => msg.id === Number(messageId));

  if (!message) {
    throw new CustomNotFoundError("Message Not Found");
  }

  res.render("message", {
    title: `Message`,
    message: message,
    link: `/${message.id}`,
  });
});

indexRouter.post("/new", (req, res) => {
  const messageText = req.body.messageText;
  const messageUser = req.body.messageUser;

  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date(),
    id: messages.length + 1,
  });

  res.redirect("/");
});

indexRouter.get("/{*splat}", (req, res) => {
  res.render("error");
});

module.exports = indexRouter;
