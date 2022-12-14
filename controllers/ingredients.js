const Recipe = require('../models/recipe')

module.exports = {
    create,
    delete: deleteItem,
    update,
    edit,

}

//adds new ingredient
function create(req, res) {
    req.body.user = req.user
    Recipe.findById(req.params.id, function(err, recipe) {
        if (req.user) {
            recipe.ingredients.push(req.body);
            recipe.save(function(err) {
                res.redirect(`/recipes/${recipe._id}`);
                console.log(req.body)
            })
        }
    })
}

function deleteItem(req, res) {
    if (req.user) {
        Recipe.findById(req.params.rId, function(err, recipe) {
        recipe.ingredients.id(req.params.iId).remove()
        recipe.save()
        res.redirect(`/recipes/${req.params.rId}`)
        })
    } else {
        res.redirect(`/recipes/${req.params.rId}`)
    }
}

// edits new ingredients
function update(req, res) {
    Recipe.findById(req.params.rId, function(err, recipe) {
        recipe.ingredients.id(req.params.iId).items = req.body.items
        recipe.save()
        res.redirect(`/recipes/${req.params.rId}`)
    })
}

function edit(req, res) {
    if (req.user) {
        Recipe.findById(req.params.rId, function(err, recipe) {
            let ingredient = recipe.ingredients.id(req.params.iId)
            res.render('ingredients/edit', { 
                title: 'Edit an Item', 
                recipe, 
                ingredient, 
                user: req.user,
                name: req.query.name, 
            })
        })
    } else {
        res.redirect(`/recipes/${req.params.rId}`)
    }
}