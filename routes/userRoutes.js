const express = require('express');
const router = express.Router(); // Crea un enrutador
const userController = require('./controllers/userController'); // Asegúrate de que la ruta al controlador sea correcta

// Define las rutas y asocia los controladores
router.post('/', userController.createUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.get('/', userController.getAllUsers);

router.post('/login', userController.login);

module.exports = router; // Exporta el enrutador
