import { DataTypes } from 'sequelize';
import sequelize from '../Database/database.js';

const Signup = sequelize.define('Signup', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [10, 15] },
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    handlename: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    profilepic: {
        type: DataTypes.STRING, // Store the link to the uploaded image
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Signup;
