const User = require('../models/user');
const Recipe = require('../models/recipe')

module.exports = {
    index,

}

function index(req, res) {
    let avgRatings = [];
    let total = 0;
    Recipe.find({}, function(err, recipes) {
        recipes.forEach(recipe => {
            total = 0
            recipe.reviews.forEach(c => {
                total += c.rating
            })
        avgRatings.push(total / recipe.reviews.length)
        })
        console.log(recipes)
        res.render('recipes/index', { 
            title: 'All Recipes', 
            recipes,
            user: req.user,
            name: req.query.name,
            avgRatings
        });
    })
}

function newRecipe(req, res) {
    res.render('recipes/new', { 
        title: 'Add Recipe',
        user: req.user,
        name: req.query.name,
    });
    
}

function create(req, res) {
    req.body.user = req.user.id
    const recipe = new Recipe(req.body);
    recipe.save(function(err) {
        if (err) return res.render('recipes/new');
        res.redirect('/recipes');
    });
}