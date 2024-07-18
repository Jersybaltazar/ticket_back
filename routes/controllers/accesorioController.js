const qr = require("qrcode");
const QRCode = require("../../models/codeqr");
const Accesorie = require("../../models/accesorie");
const { Buffer } = require("buffer");
const fs = require("fs");
const path = require("path");

const createAccesorieWithQR = async (req, res) => {
  try {

    const {
      name,
      brand,
      model,
      price,
      parts,
      induction,
      mantenimiento,
      img,
      purchase_date,
      createdQrId,
    } = req.body;
    console.log(img);
   
     // Guardar la imagen en una carpeta en el servidor
     const imageFileName = `${createdQrId}.png`; // Nombre de archivo único
     const imagePath = path.join(
       __dirname,
       "../public/images",
       imageFileName
     );
     fs.writeFileSync(imagePath, decodedImage);
    const foundCodeQR = await QRCode.findOne({
      where: {
        code: createdQrId,
      },
    });

    if (!foundCodeQR) {
      return res.status(404).json({ message: "Código QR no encontrado" });
    }

    // Crear el accesorio y asociarlo con el código QR
    const newAccesorie = await Accesorie.create({
      id_accesorie: createdQrId,
      name,
      brand,
      model,
      price,
      parts,
      induction,
      mantenimiento,
      img: `../public/images/${imageFileName}`,
      purchase_date,
    });

    return res.status(201).json(newAccesorie);
  } catch (error) {
    console.error("Error al crear el accesorio:", error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error });
  }
};

const getAllAccesories = async (req, res) => {
  try {
    const accesories = await Accesorie.findAll({
      attributes: [
        "id_accesorie",
        "name",
        "brand",
        "model",
        "price",
        "parts",
        "induction",
        "mantenimiento",
        "img",
        "purchase_date",
      ],
    });

    const accesoriesWithImagesUrl = accesories.map((accesory) => {
      if (accesory.img) {
        const imgBlob = Buffer.from(accesory.img); // Convertir el Buffer a un Uint8Array
        const imageUrl = imgBlob.toString("base64");
        return { ...accesory.dataValues, img: imageUrl };
      }
      return accesory.dataValues;
    });
    res.status(200).json(accesoriesWithImagesUrl);
  } catch (error) {
    console.error("Error al obterber los accesorios", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const updateAccesorie = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del accesorio a actualizar
    const {
      name,
      brand,
      model,
      price,
      parts,
      induction,
      mantenimiento,
      img,
      purchase_date,
    } = req.body;

    // Buscar el accesorio por su ID
    const accesorieToUpdate = await Accesorie.findByPk(id);

    if (!accesorieToUpdate) {
      return res.status(404).json({ message: "Accesorio no encontrado" });
    }

    // Actualizar los campos del accesorio
    await accesorieToUpdate.update({
      name,
      brand,
      model,
      price,
      parts,
      induction,
      mantenimiento,
      img,
      purchase_date,
    });

    res.status(200).json({ message: "Accesorio actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el accesorio:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const deleteAccesorie = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del accesorio a eliminar

    // Buscar el accesorio por su ID
    const accesorieToDelete = await Accesorie.findByPk(id);

    if (!accesorieToDelete) {
      return res.status(404).json({ message: "Accesorio no encontrado" });
    }

    // Eliminar el accesorio
    await accesorieToDelete.destroy();

    res.status(200).json({ message: "Accesorio eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el accesorio:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  deleteAccesorie,
  updateAccesorie,
  createAccesorieWithQR,
  getAllAccesories,
};
