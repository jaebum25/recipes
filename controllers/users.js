const User = require('../models/user');
const Recipe = require('../models/recipe')

module.exports = {
    index,
    new: newRecipe,
    create,
    show,
    delete: deleteRecipe,
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

function create(req, res) {
    req.body.user = req.user.id
    const recipe = new Recipe(req.body);
    recipe.save(function(err) {
        if (err) return res.render('recipes/new');
        res.redirect('/recipes');
    });
}

function newRecipe(req, res) {
    req.body.user = req.user.id
    res.render('recipes/new', { 
        title: 'Add Recipe',
        user: req.user,
        name: req.query.name,
    });
    
}

function show(req, res) {
    req.body.user = req.user.id
    Recipe.findById(req.params.id, function(err, recipe) {
        res.render('recipes/show', { 
            title: recipe.title, 
            recipe,
            user: req.user,
            name: req.query.name, 
        })
    })
}

function deleteRecipe(req, res) {
    Recipe.findById(req.params.rId, function(err, recipe) {
    //   if (recipe.user == req.user.id) {
          recipe.remove(req.params.rId)
          res.redirect('/recipes')
        //   console.log(recipe.user)
        //   console.log(req.user.id)
    //   }
    })
}