const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function createAdmin() {
    try {
        const existingAdmin = await Doctor.findOne({ email: 'admin@123' });
        if (existingAdmin) {
            console.log('Admin user already exists.');
            return;
        }
        const admin = new Doctor({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@123',
            password: 'admin123',
            role: 'admin',
        });
        await admin.save();
        console.log('Admin user created');
    }
    catch (err) {
        console.error('Error creating admin:', err.message);
    }
}

createAdmin().catch(err => console.log(err));

async function handleDoctorSignup(req, res) {
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.status(201).json(doctor);
    }
    catch (err) {
        res.status(400).json(err);
    }
}

async function handleDoctorLogin(req, res) {
    const { email, password } = req.body;
    try {
        const doctor = await Doctor.findOne({ email: email.toLowerCase() });
        if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

        const isMatch = await bcrypt.compare(password, doctor.password);
        console.log(`Password Match: ${isMatch}`);
        if (!isMatch)
            return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: doctor._id, role: doctor.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(200).json({ token, doctor });
    }
    catch (err) {
        res.status(400).json(err);
    }
}

async function getAllDoctors(req, res){
    try{
        const doctors = await Doctor.find();
        if(!doctors) return res.status(400).json({error: 'List is empty'})
        res.status(200).json(doctors);
    }
    catch(err){
        res.status(400).json(err);
    }
}

async function getDoctorById(req, res) {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) return res.status(400).json({ error: 'Doctor not found' });

        res.status(200).json({ message: 'Patient details', doctor });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

async function handleDoctorDelete(req, res) {
    const { id } = req.params;

    try {
        const doctor = await Doctor.findByIdAndDelete(id);

        if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

        res.status(200).json({ message: 'Doctor deleted' });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Something went wrong, doctor not deleted' });
    }
}

async function handleDoctorUpdate(req, res) {
    const { id } = req.params;
    const { firstName, lastName, phoneNumber, email, password } = req.body;

    try {

        const updateData = { firstName, lastName, phoneNumber, email };

        if (password) {
            const salt = await bcrypt.genSalt(10); 
            const hashedPassword = await bcrypt.hash(password, salt);
            updateData.password = hashedPassword;
        }
        const doctor = await Doctor.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        console.log(id);
        if (!doctor) return res.status(400).json({ error: 'Doctor not found' });

        res.status(200).json({ message: 'Doctor details updated successfully', doctor });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to update details' });
    }
}

async function handleForgotPassword(req, res) {
    const { email } = req.body;
    try {
        const doctor = await Doctor.findOne({ email: email.toLowerCase() });
        if (!Doctor) return res.status(400).json({ Error: 'Doctor not found' });

        const resetToken = jwt.sign(
            { id: doctor._id, role: doctor.role },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );
        console.log(`Password reset link: http://localhost:8000/api/doctors/reset-password/${resetToken}`);

        res.status(200).json({ message: 'Password reset link sent', resetToken });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error sending reset link' });
    }
}

async function handleResetPassword(req, res) {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);


        const doctor = await Doctor.findByIdAndUpdate(decode.id);
        if (!doctor) return res.status(400).json({ error: 'Doctor not found' });

        //const hashedPassword = await bcrypt.hash(password, 10);
        doctor.password = password;
        await doctor.save();

        console.log(`Updated Password for Doctor ID: ${decode.id}`);
        res.status(200).json({ message: 'password updated succesfully' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Invalid or expired token' });
    }
}


module.exports = {
    handleDoctorSignup,
    handleDoctorLogin,
    handleDoctorDelete,
    handleDoctorUpdate,
    handleForgotPassword,
    handleResetPassword,
    getAllDoctors,
    getDoctorById
}