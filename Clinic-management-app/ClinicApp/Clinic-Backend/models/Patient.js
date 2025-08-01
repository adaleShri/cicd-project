const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
    },
    age: {
        type: Number,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: String,
        require: true,
    },
    daignosis: {
        type: String,
    },
    appointmentDate: {
        type: Date,
    },
    appointmentStatus:{
        type:Boolean,
        default:false
    },
    receptionist: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Receptionist'
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'
    }
}, 
{
    timestamp: true
});

module.exports = mongoose.model('Patient', patientSchema);