const Permission  = require('../../models/permissions');

exports.createPermission = async(req,res)=>{
    try {
        
        const newPermission = await Permission.create(req.body);
        res.status(201).json(newPermission);
    } catch (error) {
        console.error(error);
        res.status(400).json({error:'Error al crear permisoss'});
        
    }
};

exports.updatePermission = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Permission.update(req.body, {
            where: { id_permission: id }
        });
        if (updated) {
            res.status(200).json({ message: 'Permiso actualizado exitosamente.' });
        } else {
            res.status(404).json({ error: 'permiso no encontrado.' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el permiso.' });
    }
};

exports.deletePermission= async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Permission.destroy({
            where: { id_permission: id }
        });
        if (deleted) {
            res.status(204).send(); // 204 No Content
        } else {
            res.status(404).json({ error: 'Permiso no encontrado.' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el permiso.' });
    }
};

exports.getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permission.findAll();
        res.status(200).json(permissions);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los permisos.' });
    }
};