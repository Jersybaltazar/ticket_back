
const express = require('express');
const router = express.Router();

const ticketController = require('./controllers/ticketController')


router.post('/', ticketController.createTicketWithQR);

router.get('/all', ticketController.getAllTickets);


module.exports = router;