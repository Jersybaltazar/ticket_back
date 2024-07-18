const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Ticket = sequelize.define('ticket', {
    id_ticket: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    event_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
    },  
    attendee_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    seat: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    qr_code: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

Ticket.sync()
    .then(() => {
        console.log('Modelo de datos "ticket" sincronizado correctamente.');
    })
    .catch((err) => {
        console.error('Error al sincronizar el modelo de datos "ticket":', err);
    });

module.exports = Ticket;
