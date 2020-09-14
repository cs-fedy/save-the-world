const router = require("express").Router();
const logRoutes = require("./logRoutes");

router.use("/log", logRoutes);

module.exports = router;