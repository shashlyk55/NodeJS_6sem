const { DataTypes } = require('sequelize')
const { sequelize } = require('../db')

const AuditoriumType = sequelize.define('Auditorium_Type', {
    auditorium_type: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    auditorium_typename: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { 
    tableName: 'AUDITORIUM_TYPE',       
    freezeTableName: true,   
    timestamps: false        
})

AuditoriumType.associate = (models) => {
    AuditoriumType.hasMany(models.Auditorium, {
        foreignKey: 'auditorium_type',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
};

module.exports.AuditoriumType = AuditoriumType