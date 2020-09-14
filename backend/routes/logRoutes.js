const logRouter = require("express").Router();
const { isValidBody } = require("../helpers/helpers");
const logSchema = require("../models/log");
const bcrypt = require("bcrypt");
const { saltRound } = require("../constants");
const { update } = require("../models/log");

logRouter.get("/", (req, res) => {
  logSchema.find({}, (err, result) => {
    if (err) return res.json(500).json({ msg: "error while getting logs" });
    return res.status(200).json({ postedLogs: result });
  });
});

logRouter.post("/", (req, res) => {
  const { name, comment, latitude, longitude, image, password } = req.body;

  const { validBody, msg } = isValidBody(name, latitude, longitude, password);
  if (!validBody) return res.status(400).json({ errorMsg: msg });

  bcrypt.hash(password, saltRound, (err, encrypted) => {
    if (err) return res.json(500).json({ msg: "internal error!" });
    logSchema.insertMany(
      {
        name,
        comment,
        latitude,
        longitude,
        image,
        status: "in hold",
        password: encrypted,
      },
      (err, doc) => {
        if (err) return res.json(500).json("error while inserting log in db");
        return res.status(200).json({ doc });
      }
    );
  });
});

logRouter.put("/:logId", (req, res) => {
  const { logId } = req.params;
  const {
    name,
    comment,
    latitude,
    longitude,
    image,
    password,
    status,
  } = req.body;
  logSchema.findOne(logId, (err, result) => {
    if (err) return res.status(500).json({ msg: "internal error!" });
    bcrypt.compare(password, result.password, (err, same) => {
      if (err) return res.status(500).json({ msg: "internal error!" });
      if (!same) return res.status(400).json({ msg: "invalid password!" });
      const updatedLog = {
        name,
        comment,
        latitude,
        longitude,
        image,
        status,
      };
      logSchema.update(result, updatedLog, (err, raw) => {
        if (err) return res.status(500).json({ msg: "internal error!" });
        return res
          .status(200)
          .json({ log: { ...updatedLog, password: result.password } });
      });
    });
  });
});

logRouter.delete("/:logId", (req, res) => {
  const { logId } = req.params;
  const { password } = req.body;
  logSchema.findOne({ _id: logId }, (err, result) => {
    if (err) return res.status(500).json({ msg: "internal error!" });
    bcrypt.compare(password, result.password, (err, same) => {
      if (err) return res.status(500).json({ msg: "internal error!" });
      if (!same) return res.status(400).json({ msg: "invalid password!" });
      logSchema.remove(result, err => {
        if (err) return res.status(500).json({ msg: "internal error!" });
        return res.status(200).json({ msg: `log with id "${logId}" removed`});
      });
    });
  });
});

logRouter.get("/:logId", (req, res) => {
  const { logId } = req.params;
  logSchema.findById(logId, (err, result) => {
    if (err) return res.status(500).json({ msg: "internal error!" });
    return res.status(200).json({ log: result });
  });
});

module.exports = logRouter;
