const Patient = require('../models/Patient');

async function handleRegisterPatient(req, res) {
    try {
        console.log(req.user);
        const patient = new Patient({ ...req.body, receptionist: req.user.id});
        await patient.save();
        res.status(201).json(patient);
    }
    catch (err) {
        res.status(400).json(err);
    }
}

async function handleBookAppointment(req, res) {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json(patient);
    }
    catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
}

async function getAllPatients(req, res) {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);

    }
    catch (err) {
        res.status(500).json({ error: 'something went wrong' });
    }
}

async function handleDeletePatient(req, res) {
    const { id } = req.params;
    try {
        const patient =await Patient.findByIdAndDelete(id);

        if (!patient) return res.status(404).json({ error: 'Patient not found' });

        res.status(200).json({ message: "Patient deleted" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Patient not deleted' });
    }
}

async function getPatientById(req, res) {
    const { id } = req.params;
    try {
        const patient = await Patient.findById(id);
        if (!patient) return res.status(400).json({ error: 'Patient not found' });

        res.status(200).json({ message: 'Patient details', patient });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

async function patientAppointmentDone(req, res) {
    const { id } = req.params;
    try {
        const patient = await Patient.findById(id);
        if (!patient) return res.status(400).json({ error: ' Patient not found' });

        patient.appointmentStatus = true;
        await patient.save();
        res.status(200).json({ message: 'Appointment done' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

async function patientAppointmentUndo(req, res) {
    const { id } = req.params;
    try {
        const patient = await Patient.findById(id);
        if (!patient) return res.status(400).json({ error: ' Patient not found' });

        patient.appointmentStatus = false;
        await patient.save();
        res.status(200).json({ message: 'Appointment Undo' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

async function handleUpdatePatient(req, res) {
    const { id } = req.params;
    const { firstName, lastName, age, gender, phoneNumber, daignosis, appointmentDate } = req.body;
    try {
        const updateData = { firstName, lastName, age, gender, phoneNumber, daignosis, appointmentDate };
        const patient = await Patient.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!patient) return res.status(400).json({ error: "Doctor not found" });

        res.status(200).json({ message: "Patient details updated successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to update details' });
    }
}

module.exports = {
    handleRegisterPatient,
    handleBookAppointment,
    getAllPatients,
    handleDeletePatient,
    getPatientById,
    patientAppointmentDone,
    patientAppointmentUndo,
    handleUpdatePatient
}