const Recipe = require('../models/recipe')

module.exports = {
    create,

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