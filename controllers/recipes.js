
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

function newRecipe(req, res) {
    res.render('recipes/new', { 
        title: 'Add Recipe',
        user: req.user,
        name: req.query.name,
    });
    
}

function create(req, res) {
    console.log(req.body)
    // req.body.user = req.user.id
    const recipe = new Recipe(req.body);
    recipe.save(function(err) {
        if (err) return res.render('recipes/new');
        console.log(recipe);
        res.redirect('/recipes');
    });
}

function show(req, res) {
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
      recipe.remove(req.params.rId)
      res.redirect('/recipes')
    })
}

// do the math here for the ratings average
// only allow delete function inside of an if
    // if (recipe.user == req.user.id)
        // then recipe.remove() - line 68
        //