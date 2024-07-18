const express = require('express');
const router = express.Router(); // Crea un enrutador
const QrController = require('./controllers/qrController');


// Asegúrate de que la ruta al controlador sea correcta
router.post('/save', QrController.saveEncryptedCode);
router.get('/qr/:id',QrController.getAccessoryDetailsFromQR);
router.put('/',QrController.updateQRCodeURL);






module.exports = router; // Exporta el enrutador
