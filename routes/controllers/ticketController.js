const qrcode = require("qrcode");
const QRCode = require("../../models/codeqr");
const Ticket = require("../../models/ticket");

// Crear un nuevo ticket y generar su código QR
exports.createTicketWithQR = async (req, res) => {
  try {
    const { event_name, date, time, attendee_name, seat, price, qr_code } =
      req.body;

    // Aquí puedes agregar validaciones de los datos recibidos

    // Buscar el código QR asociado
    const foundCodeQR = await QRCode.findOne({
      where: {
        code: qr_code,
      },
    });

    if (!foundCodeQR) {
      return res.status(404).json({ message: "Código QR no encontrado" });
    }

    // Crear el accesorio y asociarlo con el código QR
    const newTicket = await Ticket.create({
      event_name,
      date,
      time,
      attendee_name,
      seat,
      price,
      qr_code,
    });

    return res.status(201).json(newTicket);
  } catch (error) {
    console.error("Error al crear el Ticket:", error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error });
  }
};

// Obtener todos los tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error al obtener los tickets:", error);
    res.status(500).json({ error: "Error al obtener los tickets." });
  }
};

// Obtener un ticket por su ID
exports.getTicketById = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket no encontrado." });
    }
    res.status(200).json(ticket);
  } catch (error) {
    console.error("Error al obtener el ticket:", error);
    res.status(500).json({ error: "Error al obtener el ticket." });
  }
};

// Actualizar un ticket por su ID
exports.updateTicket = async (req, res) => {
  const { id } = req.params;
  const { event_name, date, time, venue, attendee_name, seat } = req.body;
  try {
    const [updated] = await Ticket.update(
      { event_name, date, time, venue, attendee_name, seat },
      {
        where: { id_ticket: id },
      }
    );
    if (updated) {
      res.status(200).json({ message: "Ticket actualizado exitosamente." });
    } else {
      res.status(404).json({ error: "Ticket no encontrado." });
    }
  } catch (error) {
    console.error("Error al actualizar el ticket:", error);
    res.status(500).json({ error: "Error al actualizar el ticket." });
  }
};

// Eliminar un ticket por su ID
exports.deleteTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Ticket.destroy({
      where: { id_ticket: id },
    });
    if (deleted) {
      res.status(204).send(); // 204 No Content
    } else {
      res.status(404).json({ error: "Ticket no encontrado." });
    }
  } catch (error) {
    console.error("Error al eliminar el ticket:", error);
    res.status(500).json({ error: "Error al eliminar el ticket." });
  }
};
