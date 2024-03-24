const express = require("express");
const { auth } = require("../Middleware/authMiddleware");
const { geoModel } = require("../Model/geoModel");


const geoRouter = express.Router();

// Add auth middleware if you want to protect these routes
geoRouter.use(auth);

// Add a new geospatial data
geoRouter.post("/add", async (req, res) => {
    try {
        const newGeospatialData = new geoModel(req.body);
        await newGeospatialData.save();
        res.status(201).json({ msg: "Geospatial data added successfully", data: newGeospatialData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all geospatial data
geoRouter.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const dataPerPage = 6; // Number of data per page

        // Count total data
        const totalData = await geoModel.countDocuments();

        // Calculate total pages
        const totalPages = Math.ceil(totalData / dataPerPage);

        // Skip and limit based on pagination
        const skip = (page - 1) * dataPerPage;

        // Retrieve geospatial data with pagination
        const geospatialData = await geoModel
            .find()
            .skip(skip)
            .limit(dataPerPage);

        res.json({ msg: "Geospatial data", data: geospatialData, totalPages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific geospatial data by ID
geoRouter.get("/:id", async (req, res) => {
    try {
        const geospatialData = await geoModel.findById(req.params.id);
        if (geospatialData) {
            res.json({ msg: "Geospatial data", data: geospatialData });
        } else {
            res.status(404).json({ msg: "Geospatial data not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a geospatial data by ID
geoRouter.patch("/update/:id", async (req, res) => {
    try {
        const updatedGeospatialData = await geoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedGeospatialData) {
            res.json({ msg: "Geospatial data updated successfully", data: updatedGeospatialData });
        } else {
            res.status(404).json({ msg: "Geospatial data not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a geospatial data by ID
geoRouter.delete("/delete/:id", async (req, res) => {
    try {
        const deletedGeospatialData = await geoModel.findByIdAndDelete(req.params.id);
        if (deletedGeospatialData) {
            res.json({ msg: "Geospatial data deleted successfully", data: deletedGeospatialData });
        } else {
            res.status(404).json({ msg: "Geospatial data not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = {
    geoRouter,
};