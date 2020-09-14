require("dotenv").config();

const dbURI = process.env.DB_URI;
const port = process.env.PORT || 5050;
const saltRound = 10;

module.exports = {
    dbURI,
    port,
    saltRound
}