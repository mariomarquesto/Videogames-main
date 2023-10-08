const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion:{
      type: DataTypes.TEXT,
      allowNull: true,
    },
    plataformas:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [] 
    },
    imagen:{
      type: DataTypes.TEXT,
      allowNull: true,
      validate:{
        isUrl: true,
      }
    },
    fecha_lanzamiento:{
      type: DataTypes.STRING,
      allowNull: false 
    },
    rating:{
      type: DataTypes.FLOAT,
      allowNull: true
    },
  },{
    timestamps: false
  });
};
