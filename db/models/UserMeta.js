export default (sequelize, DataTypes) => {
    const UserMeta = sequelize.define("user_meta", {
        umeta_id: {
            type: DataTypes.BIGINT(20),
            autoIncrement: true,
            primaryKey: true,
            unsigned: true,
        },
        user_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            unsigned: true,
            defaultValue: 0,
        },
        meta_key: {
            type: DataTypes.STRING,
        },
        meta_value: {
            type: DataTypes.TEXT('long'),
        }

    }, {
        timestamps: false
    })

    UserMeta.associate = function (models) {
        UserMeta.belongsTo(models.users, { foreignKey: 'user_id', sourceKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    }

    return UserMeta
}