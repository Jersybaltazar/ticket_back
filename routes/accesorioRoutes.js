
const express = require('express');
const router = express.Router();

const accesorieController = require('./controllers/accesorioController')


router.post('/', accesorieController.createAccesorieWithQR);
router.get('/all', accesorieController.getAllAccesories);
router.delete('/:id', accesorieController.deleteAccesorie);


module.exports = router;