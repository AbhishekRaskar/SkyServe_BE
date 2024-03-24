const mongoose = require("mongoose");

const geoSchema = mongoose.Schema(
    {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        population: { type: Number, required: true },
        timezone: { type: String, required: true },
        region: { type: String, required: true },
    },
    {
        versionKey: false,
    }
);

const geoModel = mongoose.model("geo", geoSchema);

module.exports = {
    geoModel,
};