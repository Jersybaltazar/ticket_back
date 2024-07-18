const {DataTypes} = require('sequelize');
const sequelize  = require('../config/sequelize');
const Permission = require('./permissions');

const User = sequelize.define('user',{
    id_users:{ 
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING(200),
        allowNull:false,

    },
    lastName:{
        type:DataTypes.STRING(200),
        allowNull:false,
    },
    permission:{
        type:DataTypes.INTEGER,
        defaultValue: 1,
        references:{
            model:'permission',
            key: 'id_permission',
        },  
    },
    email:{
        type :DataTypes.TEXT,
        allowNull: false,
        validate:{
            len:[1,250]
        }
    },
    password:{
        type:DataTypes.CHAR(64),
        allowNull: false,
        
     }

},{
    freezeTableName:true,
    timestamps: false,
});
User.sync()
    .then(()=>{
        console.log('Modelo de datos "user" sincronizado correctamente.');
        
    })
    .catch((err)=>{
        console.error('Error al sincronizar el modelo de datos "user":', err);
    }); 

 module.exports = User;