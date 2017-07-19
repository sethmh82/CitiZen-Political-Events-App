module.exports = function(sequelize, DataTypes) {
    var Events = sequelize.define("Events", {
        event_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
         event_desc: {
            type: DataTypes.STRING,
            allowNull: false
        },
         event_location: {
            type: DataTypes.STRING,
            allowNull: false
        },
         event_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        removed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    
    });
    return Events;
};
