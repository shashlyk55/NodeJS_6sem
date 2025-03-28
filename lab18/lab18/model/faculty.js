const { DataTypes } = require('sequelize')
const { sequelize } = require('../db')

const Faculty = sequelize.define('Faculty', {
    faculty: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    faculty_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { 
    tableName: 'FACULTY',       
    freezeTableName: true,   
    timestamps: false        
})

Faculty.associate = (models) => {
    Faculty.hasMany(models.Pulpit, {
        foreignKey: 'faculty',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
};

module.exports.Faculty = Faculty