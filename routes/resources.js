const express = require("express");
const router = express.Router();
const joi = require("@hapi/joi");
const nconf = require("nconf");
const models = require("../models/resources");

router.get("/", async (req, res) => {
  try {
    console.log(req.decoded);
    let data = await models.getAllResource(req.decoded);
    res.json({ error: false, message: data.data });
  } catch (e) {
    res.json({ error: true, message: e });
  }
});

router.get("/file/:id", async (req, res) => {
  try {
    console.log(req.decoded);
    let data = await models.getFileDataById(req.params.id);
    res.json({ error: false, message: data.data });
  } catch (e) {
    res.json({ error: true, message: e });
  }
});

router.get("/folder/:id", async (req, res) => {
  try {
    console.log(req.decoded);
    let data = await models.getFolderDataById(req.params.id);
    console.log(data);
    res.json({ error: false, message: data.data });
  } catch (e) {
    res.json({ error: true, message: e });
  }
});

router.post("/folder", async (req, res) => {
  try {
    console.log(req.decoded);
    let data = await models.createFolder(req.decoded, req.body.folderName);
    res.json({ error: false, message: data.data });
  } catch (e) {
    res.json({ error: true, message: e });
  }
});

router.post("/file", async (req, res) => {
  try {
    console.log(req.decoded);
    let data = await models.createFile(
      req.decoded,
      req.body.folderId,
      req.body.file
    );
    res.json({ error: false, message: data.data });
  } catch (e) {
    res.json({ error: true, message: e });
  }
});

//cd9253bd-e712-4a40-b5a8-023cc2961306

module.exports = router;
