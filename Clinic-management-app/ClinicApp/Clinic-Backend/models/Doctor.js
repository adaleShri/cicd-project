const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const doctorSchema = new mongoose.Schema(
    {
    firstName: {
        type: String,
        require: true,
    }, 
    lastName: {
        type: String,
    },
    phoneNumber: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    role:{
        type:String,
        enum:['doctor', 'admin'],
        default:'doctor'
    }
},
    {
        timestamps: true
    });

doctorSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('Doctor', doctorSchema);