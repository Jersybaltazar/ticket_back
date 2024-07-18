const qr = require("qrcode");
const { Op } = require('sequelize');
const QRCode = require("../../models/codeqr");// Asegúrate de importar el modelo QRCode correctamente
const Ticket = require("../../models/ticket");

// Generar y asignar un nuevo código QR a un accesorio



exports.saveEncryptedCode = async (req, res) => {
  try {
    // Verificar que la solicitud tenga un cuerpo y sea de tipo JSON
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ message: 'Cuerpo de solicitud inválido' });
    }
    // Verificar que el objeto JSON tenga la propiedad 'code'
    if (!req.body.code) {
        return res.status(400).json({ message: 'La propiedad "code" es requerida en el cuerpo de la solicitud' });
      }

    const {code}   = req.body; // Obtén el valor del código QR del cuerpo de la solicitud

    const createdQR = await QRCode.create({
        code,      
    });

    res.status(201).json({
      message: "Código QR guardado exitosamente.",
      code: createdQR.code,
    });
  } catch (error) {
    console.error("Error al guardar el código QR:", error);
    res.status(500).json({ message: "Error al guardar el código QRs." });
  }
};

exports.getAccessoryDetailsFromQR = async (req, res) => {
  try {

      // El identificador único (ID) del accesorio
    const { id } = req.params;

    const ticket = await Ticket.findOne({
      where: {
        qr_code:id,
      },
    });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }

      return res.status(200).json(ticket);
    // res.render('qr-details', { accessory });
  } catch (error) {
    console.error('Error al obtener detalles del Tciket', error);
    return res.status(500).json({ message: 'Error interno del servidsor' });
  }
};

exports.updateQRCodeURL = async (id_qr, newUrl) => {
  try {
    // Buscar el QRCode por su ID
    const qrCodeToUpdate = await QRCode.findByPk(id_qr);

    if (!qrCodeToUpdate) {
      console.error("QRCode no encontrado");
      return;
    }

    // Actualizar la URL en el QRCode
    await qrCodeToUpdate.update({
      code: newUrl,
    });

    console.log("URL del QRCode actualizada exitosamente");
  } catch (error) {
    console.error("Error al actualizar la URL del QRCode:", error);
  }
};