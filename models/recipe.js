const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ingredientSchema = new mongoose.Schema({
    text: String
}, {
    timestamps: true
});

const recipeSchema = new Schema({
    title: String,
    prepTime: Number,
    ingredeints: [ingredientSchema],
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema)