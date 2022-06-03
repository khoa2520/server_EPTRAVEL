const favController = require('../controllers/favControllers')
const router = require('express').Router();


router.post('/', favController.createFav)
router.patch('/updateFav', favController.updateFav)

router.post('/check/checkUser', favController.checkFav)
router.post('/getTourInFav', favController.getTourInFav)
router.post('/getAllTourInFav', favController.getAllTourInFav)

module.exports = router;