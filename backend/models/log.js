const mongoose = require("mongoose");

const requiredString = {
    type: String,
    required: true
};

const requiredNumber = {
    type: Number,
    required: true
};

const logSchema = new mongoose.Schema({
    name: requiredString,
    status: requiredString,
    password: requiredString,
    latitude: {
        ...requiredNumber,
        min: -90,
        max: 90
    },
    longitude: {
        ...requiredNumber,
        min: -180,
        max: 180
    },
    comment: String,
    imageURL: String
});

module.exports = mongoose.model("log", logSchema);