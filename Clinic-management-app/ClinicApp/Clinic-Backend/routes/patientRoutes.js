const express = require('express');
const Patient = require('../models/Patient');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {handleRegisterPatient,
       handleBookAppointment, 
       getAllPatients, 
       handleDeletePatient,
       getPatientById,
       patientAppointmentDone,
       patientAppointmentUndo,
       handleUpdatePatient
    } = require('../controllers/patientController');

router.post('/register', authMiddleware, roleMiddleware(['receptionist', 'doctor','admin']), handleRegisterPatient);

router.post('/book-appointment',handleBookAppointment);

router.get('/all', authMiddleware, roleMiddleware(['receptionist', 'doctor','admin']),getAllPatients);

router.delete('/delete/:id', authMiddleware, roleMiddleware(['receptionist', 'doctor','admin']),handleDeletePatient);

router.get('/getById/:id', authMiddleware, roleMiddleware(['receptionist', 'doctor','admin']),getPatientById);

router.put('/apointment-done/:id', authMiddleware, roleMiddleware(['receptionist', 'doctor','admin']), patientAppointmentDone);

router.put('/apointment-undo/:id', authMiddleware, roleMiddleware(['receptionist', 'doctor','admin']), patientAppointmentUndo);

router.put('/update/:id', authMiddleware, roleMiddleware(['receptionist','doctor','admin']), handleUpdatePatient );



// router.post('/register', authMiddleware, roleMiddleware(['receptionist', 'doctor']), async(req, res)=>{
//     try{
//         const patient = new Patient({...req.body, receptionist:req.user.id});
//         await patient.save();
//         res.status(201).json(patient);
//     }
//     catch(err){
//         res.status(400).json(err);
//     }
// });

// router.post('/book-appointment', async(req, res)=>{
//     try{
//         const patient = new Patient(req.body);
//         await patient.save();
//         res.status(201).json(patient);
//     }
//     catch(err){
//         res.status(400).json(err);
//         console.log(err);
//     }
// });

// router.get('/all', authMiddleware, roleMiddleware(['receptionist', 'doctor']), async (req, res)=>{
//     try{
//         const patients = await Patient.find();
//         res.status(200).json(patients);

//     }
//     catch(err){
//         res.status(500).json({error: 'something went wrong'});
//     }
// });

// router.delete('/delete', authMiddleware, roleMiddleware(['receptionist', 'doctor']), async (req,res)=>{
//     const {id} = req.params;
//     try{
//         const patient = Patient.findByIdAndDelete(id);

//         if(!patient) return res.status(404).json({error: 'Patient not found'});

//         res.status(200).json({message: "Patient deleted"});
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Patient not deleted'});
//     }
// });



module.exports = router;