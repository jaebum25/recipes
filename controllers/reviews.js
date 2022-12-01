const Recipe = require('../models/recipe')

module.exports = {
    create,
    delete: deleteReview,
}

function create(req, res) {
    req.body.user = req.user
    Recipe.findById(req.params.id, function(err, recipe) {
        if (req.user) {
            recipe.reviews.push(req.body);
            recipe.save(function(err) {
                res.redirect(`/recipes/${recipe._id}`);
            });
        };
    })
}

function deleteReview(req, res) {
    if (req.user) {
        Recipe.findById(req.params.rId, function(err, recipe) {
        recipe.reviews.id(req.params.cId).remove()
        recipe.save()
        res.redirect(`/recipes/${req.params.rId}`)
        })
    }
}