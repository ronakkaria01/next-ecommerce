export default (sequelize, DataTypes) => {
    const OrderStatus = sequelize.define("order_statuses", {
        id: {
            type: DataTypes.BIGINT(20),
            autoIncrement: true,
            primaryKey: true,
            unsigned: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        timestamps: false
    })

    return OrderStatus
}