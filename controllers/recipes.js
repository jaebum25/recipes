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
        // console.log(recipes)
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
    if (req.user) {
    res.render('recipes/new', { 
        title: 'Add Recipe',
        user: req.user,
        name: req.query.name,
    });
    } else {
        res.redirect('/recipes')
    }
}

function create(req, res) {
    req.body.user = req.user
    const recipe = new Recipe(req.body);
    recipe.save(function(err) {
        if (err) return res.render('recipes/new');
        console.log(recipe)
        res.redirect('/recipes');
    });
}
async function show(req, res) {
    let recipe = await Recipe.findById(req.params.id).populate({
        path: 'reviews',
        populate: { path: 'user', model: 'User'}
    })
    res.render('recipes/show', { 
        title: recipe.title, 
        recipe,
        user: req.user,
        name: req.query.name, 
    })
}
// function show(req, res) {
//     Recipe.findById(req.params.id, function(err, recipe) {
//         res.render('recipes/show', { 
//             title: recipe.title, 
//             recipe,
//             user: req.user,
//             name: req.query.name, 
//         })
//     })
// }

function deleteRecipe(req, res) {
    Recipe.findById(req.params.rId, function(err, recipe, ) {
    //   if (recipe.user == req.user) {
          recipe.remove(req.params.rId)
          res.redirect('/recipes')
          console.log(recipe)
        //   console.log(req.user.id)
    //   }
    })
}

// only allow delete function inside of an if
    // if (recipe.user == req.user.id)
        // then recipe.remove() - line 68
        // if (recipe.user == req.user) this one letes me delete when logged out
