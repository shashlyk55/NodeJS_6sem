const { DataTypes } = require('sequelize')
const { sequelize } = require('../db');
const { AuditoriumType } = require('./auditoriumType');

const Auditorium = sequelize.define('Auditorium', {
    auditorium: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    auditorium_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    auditorium_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    auditorium_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { 
    tableName: 'AUDITORIUM',       
    freezeTableName: true,   
    timestamps: false        
})

Auditorium.associate = (models) => {
    Auditorium.belongsTo(models.AuditoriumType, {
        foreignKey: 'auditorium_type',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
};

// Auditorium.belongsTo(AuditoriumType, { foreignKey: 'AUDITORIUM_TYPE' });
// AuditoriumType.hasMany(Auditorium, { foreignKey: 'AUDITORIUM_TYPE' });

module.exports.Auditorium = Auditorium