const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const userRoutes = require('./routes/userRoutes');
const codeQRRoutes = require('./routes/qrRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const ticketRoutes = require('./routes/ticketRoute');
// Middlewares
app.use(cors({
  origin:['https://ticket-front-1.onrender.com'],
  credentials:true,
}));
app.use(bodyParser.json({limit:'10mb'}));
// En tu archivo de servidor (index.js o app.js)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// Routes



app.use('/users', userRoutes);
app.use('/ticket',ticketRoutes)
app.use('/codeqr', codeQRRoutes);
app.use('/permissions', permissionRoutes);

// Error Handling Middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
