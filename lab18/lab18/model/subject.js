const { DataTypes } = require('sequelize')
const { sequelize } = require('../db')

const Subject = sequelize.define('Subject', {
    subject: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    subject_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pulpit: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { 
    tableName: 'SUBJECT',       
    freezeTableName: true,   
    timestamps: false        
})

Subject.associate = (models) => {
    Subject.belongsTo(models.Pulpit, {
        foreignKey: 'pulpit',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
};

module.exports.Subject = Subject