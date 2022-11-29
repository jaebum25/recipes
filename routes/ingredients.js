var express = require('express');
var router = express.Router();
const ingredientsCtrl = require('../controllers/ingredients')

router.post('/recipes/:id/ingredients', ingredientsCtrl.create);
router.delete('/recipes/:rId/ingredients/:iId', ingredientsCtrl.delete)
router.put('/recipes/:rId/ingredients/:iId', ingredientsCtrl.update)

module.exports = router;
