export default (sequelize, DataTypes) => {
    const PostMeta = sequelize.define("post_meta", {
        meta_id: {
            type: DataTypes.BIGINT(20),
            autoIncrement: true,
            primaryKey: true,
            unsigned: true,
        },
        post_id: {
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

    PostMeta.associate = function (models) {
        PostMeta.belongsTo(models.posts, { foreignKey: 'post_id', sourceKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    }


    return PostMeta
}