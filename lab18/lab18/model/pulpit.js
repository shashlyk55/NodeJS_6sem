const { DataTypes } = require('sequelize')
const { sequelize } = require('../db')
const {Faculty} = require('./faculty')
const {Subject} = require('./subject')

const Pulpit = sequelize.define('Pulpit', {
    pulpit: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    pulpit_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    faculty: {
        type: DataTypes.STRING,
        allowNull: false,
        // references: {
        //     model: Faculty,
        //     key: 'FACULTY'
        // },
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
    },
}, { 
    tableName: 'PULPIT',       
    freezeTableName: true,   
    timestamps: false        
})

Pulpit.associate = (models) => {
    Pulpit.belongsTo(models.Faculty, {
        foreignKey: 'faculty',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });

    Pulpit.hasMany(models.Subject, {
        foreignKey: 'pulpit',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
};

// Pulpit.belongsTo(Faculty, { foreignKey: 'faculty' });
// Faculty.hasMany(Pulpit, { foreignKey: 'faculty' });
// Subject.belongsTo(Pulpit, { foreignKey: 'pulpit' });
// Pulpit.hasMany(Subject, { foreignKey: 'pulpit' });

module.exports.Pulpit = Pulpit