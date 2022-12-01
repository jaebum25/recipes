const Recipe = require('../models/recipe')
const User = require('../models/user')

module.exports = {
    create,
    delete: deleteReview,
}

function create(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        recipe.reviews.push(req.body);
        recipe.save(function(err) {
            res.redirect(`/recipes/${recipe._id}`);
        });
    });
}

function deleteReview(req, res) {
    Recipe.findById(req.params.rId, function(err, recipe) {
      recipe.reviews.id(req.params.cId).remove()
      recipe.save()
      res.redirect(`/recipes/${req.params.rId}`)
    })
}