export default (sequelize, DataTypes) => {
    const OrderItem = sequelize.define("order_item", {
        order_item_id: {
            type: DataTypes.BIGINT(20),
            autoIncrement: true,
            primaryKey: true,
            unsigned: true
        },
        order_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            unsigned: true,
        },
        product_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            unsigned: true,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
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
        }
    }, {
        timestamps: false
    })

    OrderItem.associate = function (models) {
        OrderItem.belongsTo(models.orders, { foreignKey: 'order_id', sourceKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    }

    return OrderItem
}