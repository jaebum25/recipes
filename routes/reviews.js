var router = require('express').Router();
const reviewsCtrl = require('../controllers/reviews')

router.post('/recipes/:id/reviews', reviewsCtrl.create);
// router.put('/recipes/:rId/reviews/:cId', reviewsCtrl.update)
router.delete('/recipes/:rId/reviews/:cId', reviewsCtrl.delete)

module.exports = router;

