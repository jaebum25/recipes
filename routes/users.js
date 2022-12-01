var router = require('express').Router();
var usersCtrl = require('../controllers/users');

// GET /students
router.get('/users', usersCtrl.index);
router.get('/new', usersCtrl.new);
router.get('/:id', usersCtrl.show);
router.post('/', usersCtrl.create);
router.delete('/:rId/', usersCtrl.delete)


// POST /facts
// We will already have access to the logged in student on
// the server, therefore do not use: /students/:id/facts

// router.post('/recipes', isLoggedIn, studentsCtrl.addFact);

// // DELETE /facts/:id

// router.delete('/recipes/:id', recipesCtrl.delFact);


// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) return next()
//     res.redirect('/auth/google')
// }

module.exports = router;
