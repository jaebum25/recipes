const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ingredientSchema = new mongoose.Schema({
    items: String
}, {
    timestamps: true
});

const reviewSchema = new Schema({
    content: String,
    rating: {type: Number, min: 1, max: 5, default: 5}
}, {
    timestamps: true
});

const recipeSchema = new Schema({
    title: String,
    prepTime: Number,
    ingredients: [ingredientSchema],
    googleId: String,
    reviews: [reviewSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema)