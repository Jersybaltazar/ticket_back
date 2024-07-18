const User = require('../../models/users'); // Asegúrate de importar correctamente el modelo User
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            name: req.body.name,
            lastName: req.body.lastName,
      //      permission: req.body.permission,
            email: req.body.email,
            password: hashedPassword,
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al crear el usuario.', details: error.message });
    }
};

// Actualizar un usuario existente por su ID
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await User.update(req.body, {
            where: { id_users: id }
        });
        if (updated) {
            res.status(200).json({ message: 'Usuario actualizado exitosamente.' });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado.' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el usuario.' });
    }
};

// Eliminar un usuario por su ID
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await User.destroy({
            where: { id_users: id }
        });
        if (deleted) {
            res.status(204).send(); // 204 No Content
        } else {
            res.status(404).json({ error: 'Usuario no encontrado.' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el usuario.' });
    }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios.' });
    }
};



// Endpoint para iniciar sesión
exports.login = async (req, res) => {

    const { email } = req.body;

    try {
        // Buscar al usuario por su dirección de correo electrónico
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Credenciales incorrectas.' });
        }

        // Comparar la contraseña proporcionada con la almacenada en la base de datos
     

        const token = jwt.sign({ userId: user.id_users, email: user.email }, 'secretKey', { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Inicio de sesión exitoso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el inicio de sesisón.' });
    }
};