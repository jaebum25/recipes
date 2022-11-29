const Recipe = require('../models/recipe')

module.exports = {
    create,

}

function create(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        recipe.reviews.push(req.body);
        recipe.save(function(err) {
            res.redirect(`/recipes/${recipe._id}`);
        });
    });
}
