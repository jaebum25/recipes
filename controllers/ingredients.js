const Recipe = require('../models/recipe')

module.exports = {
    create,
    delete: deleteItem,
    update,

}

function create(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        recipe.ingredients.push(req.body);
        recipe.save(function(err) {
            res.redirect(`/recipes/${recipe._id}`);
            console.log(req.body)
        })
    })
}

function deleteItem(req, res) {
    Recipe.findById(req.params.rId, function(err, recipe) {
      recipe.ingredients.id(req.params.iId).remove()
      recipe.save()
      res.redirect(`/recipes/${req.params.rId}`)
    })
}

function update(req, res) {
    Recipe.findById(req.params.rId, function(err, recipe) {
        recipe.ingredients.id(req.params.iId).items = req.body.items
        recipe.save()
        res.redirect(`/recipes/${req.params.rId}`)
    })
}

