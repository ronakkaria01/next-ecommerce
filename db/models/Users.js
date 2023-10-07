export default (sequelize, DataTypes) => {
    const Users = sequelize.define("users", {
        id: {
            type: DataTypes.BIGINT(20),
            autoIncrement: true,
            primaryKey: true,
            unsigned: true
        },
        first_name: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        last_name: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        user_name: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: false,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        timestamps: true
    })

    return Users
}