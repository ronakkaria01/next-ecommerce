export default (sequelize, DataTypes) => {
    const Posts = sequelize.define("posts", {
        id: {
            type: DataTypes.BIGINT(20),
            autoIncrement: true,
            primaryKey: true,
            unsigned: true
        },
        post_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_content: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ''
        },
        post_author: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            defaultValue: 0,
            unsigned: true
        },
        post_excerpt: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '',
        },
        post_status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'publish',
        },
        post_parent: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            defaultValue: 0,
            unsigned: true
        },
        post_type: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'post',
        },

    }, {
        timestamps: true
    })

    Posts.associate = function (models) {
        Posts.hasMany(models.post_meta, { foreignKey: "post_id", onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    }

    return Posts
}