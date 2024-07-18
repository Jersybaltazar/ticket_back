const express = require('express');
const router = express.Router(); // Crea un enrutador
const permissionController = require('./controllers/permissionController');


router.post('/', permissionController.createPermission);
// router.put('/:id', permissionController.updatePermission);
// router.delete('/:id', permissionController.deletePermission);
router.get('/', permissionController.getAllPermissions);

module.exports = router;