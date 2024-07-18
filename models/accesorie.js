const {DataTypes} = require('sequelize');
const sequelize  = require('../config/sequelize'); 


const Accesorie = sequelize.define('accesorie',{
    id_accesorie:{
        type: DataTypes.STRING(250),
        primaryKey: true,
        allowNull: false,
        references:{
            model:'codeqr',
            key:'code',
        },
    },
    name:{
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    brand:{
        type:DataTypes.STRING(100),
        allowNull:false,
    },
    model:{
        type:DataTypes.STRING(100),
        allowNull: false,
    },
    price:{
        type: DataTypes.STRING(100),
        allowNull:false,
    },
    parts:{
        type: DataTypes.STRING(100),
        allowNull:false,
    },
    induction:{
        type:DataTypes.STRING(100),
        allowNull:  false,
    },
    mantenimiento: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
    img: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
    purchase_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
 
},{
    freezeTableName:true,
    timestamps: false,
});
//sincronizar al modelo de la base de datos(crear la tabla si no existe)

Accesorie.sync()
    .then(()=>{
        console.log('Modelo de datos "accesories" sincronizado correctamente.');

    })
    .catch((err)=>{
        console.log('Error al sincronizar el modeloe de datos "accesories"', err);
    });
    
    module.exports  = Accesorie;