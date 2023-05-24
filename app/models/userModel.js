/** 
 * @typedef user,
 * @property {string} name.required
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} role.required
*/




module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        email: {
            type: DataTypes.STRING,
            unique:true,
            isEmail: true, 
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role:{
            type: DataTypes.STRING,
            allowNull: false
        },
    }, { timestamps: true },)
    return User
};