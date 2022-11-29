const Recipe = require('../models/recipe')

module.exports = {
    index,
    new: newRecipe,
    create,
    show,
    delete: deleteRecipe

}

function index(req, res) {
    Recipe.find({}, function(err, recipes) {
        console.log(recipes)
        res.render('recipes/index', { 
            title: 'All Recipes', 
            recipes,
            user: req.user,
            name: req.query.name,
        });
    })
}

function newRecipe(req, res) {
    res.render('recipes/new', { title: 'Add Recipe'});
}

function create(req, res) {
    console.log(req.body)
    const recipe = new Recipe(req.body);
    recipe.save(function(err) {
        if (err) return res.render('recipes/new');
        console.log(recipe);
        res.redirect('/recipes');
    });
}

function show(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        res.render('recipes/show', { title: recipe.title, recipe })
    })
}

function deleteRecipe(req, res) {
    Recipe.findById(req.params.rId, function(err, recipe) {
      recipe.remove(req.params.rId)
      res.redirect('/recipes')
    })
}