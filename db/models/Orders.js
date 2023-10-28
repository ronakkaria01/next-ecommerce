export default (sequelize, DataTypes) => {
    const Orders = sequelize.define("orders", {
        id: {
            type: DataTypes.BIGINT(20),
            autoIncrement: true,
            primaryKey: true,
            unsigned: true
        },
        user_id: {
            type: DataTypes.BIGINT(20),
            unsigned: true
        },
        order_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        total: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subtotal: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        taxes: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        delivery: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        order_data: {
            type: DataTypes.JSON,
            allowNull: false
        },
        user_data: {
            type: DataTypes.JSON,
            allowNull: false
        }
    }, {
        timestamps: true
    })

    Orders.associate = function (models) {
        Orders.hasMany(models.order_item, { foreignKey: "order_id", onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    }

    Orders.associate = function (models) {
        Orders.belongsTo(models.order_statuses, { foreignKey: "id" })
    }

    return Orders
}