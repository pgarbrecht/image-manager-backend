// Using mongoose for the schema builder
const mongoose = require('mongoose');

// Setting up the schema
const imageSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    url: { type: String, required: true }
});

// Exporting the schema for use in the app
const Images = mongoose.model('Images', imageSchema);

module.exports = Images;