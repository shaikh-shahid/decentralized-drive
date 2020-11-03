const express = require("express");
const router = express.Router();
const joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const nconf = require("nconf");
const addressGenerator = require("../genkey");
const models = require("../models/users");

router.post("/login", async (req, res) => {
  try {
    const schema = joi.object().keys({
      email: joi.string().email().required(),
      password: joi.string().min(6).max(20).required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      throw result.error.details[0].message;
    }
    let checkUserLogin = await models.verifyUser(result.value);
    if (checkUserLogin.error) {
      throw checkUserLogin.message;
    }
    const token = jwt.sign(checkUserLogin.data, nconf.get("tokenSecret"), {
      expiresIn: 604800, // expires in 1 week
    });
    checkUserLogin.token = token;
    res.json(checkUserLogin);
  } catch (e) {
    res.json({ error: true, message: e });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const schema = joi.object().keys({
      name: joi.string().min(3).max(45).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).max(20).required(),
      role: joi.string().min(2).max(20).required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      throw result.error.details[0].message;
    }
    let addressData = addressGenerator();
    result.value.publicKey = addressData.publicKey;
    result.value.privateKey = addressData.privateKey;
    let addUserResponse = await models.addUser(result.value);
    res.json(addUserResponse);
  } catch (e) {
    res.json({ error: true, message: e });
  }
});

router.get("/logout", (req, res) => {
  console.log("Successfully logged out");
});

module.exports = router;
