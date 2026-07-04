const db = require("../db/queries");
const {
  validationResult,
  body,
  param,
  matchedData,
} = require("express-validator");
const CustomNotFoundError = require("../errors/CustomNotFoundError.js");

async function getMessages(req, res) {
  const messages = await db.getAllmessages();
  res.render("index", { messages: messages });
}

function getNewUser(req, res) {
  res.render("form");
}

function getRedirectHome(req, res) {
  res.redirect("/");
}

const validateMessageId = param("messageId")
  .isInt({ min: 1 })
  .withMessage("The message route must be an integer");

const getMessage = [
  validateMessageId,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("error", { errors: errors.array() });
    }

    const { messageId } = matchedData(req);
    const message = await db.getMessage(messageId);

    if (!message) {
      throw new CustomNotFoundError("Message not found");
    }

    res.render("message", { title: "Message", message: message });
  },
];

const validateNewMessage = [
  body("messageUser")
    .trim()
    .isAlpha()
    .withMessage("Name must only contain letters.")
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be between 3 and 30 characters."),
  body("messageText")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Message must be between 1 and 500 characters."),
];

const postNewUser = [
  validateNewMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", { errors: errors.array() });
    }

    const { messageUser, messageText } = matchedData(req);
    await db.insertMessage(messageUser, messageText);
    res.redirect("/");
  },
];

function getInvalidRoute(req, res) {
  res.render("error", { errors: [{ msg: "Invalid route" }] });
}

module.exports = {
  getMessages,
  getMessage,
  getNewUser,
  getRedirectHome,
  postNewUser,
  getInvalidRoute,
};
