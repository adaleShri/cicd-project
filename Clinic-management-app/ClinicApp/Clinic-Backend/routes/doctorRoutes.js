const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const Doctor = require('../models/Doctor');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { handleDoctorSignup,
    handleDoctorLogin,
    handleDoctorDelete,
    handleDoctorUpdate,
    handleForgotPassword,
    handleResetPassword,
    getAllDoctors,
    getDoctorById } = require('../controllers/doctorController');

const router = express.Router();

router.post('/register', authMiddleware, adminMiddleware,  roleMiddleware(['admin']), handleDoctorSignup);

router.post('/login', handleDoctorLogin);

router.delete('/delete', authMiddleware, roleMiddleware(['doctor','admin']), handleDoctorDelete);

router.put('/update/:id', authMiddleware, roleMiddleware(['doctor','admin']), handleDoctorUpdate);

router.post('/forgot-password', handleForgotPassword);

router.post('/reset-password/:token', handleResetPassword);

router.get('/getAll', authMiddleware, roleMiddleware(['admin']), getAllDoctors);

//router.get('/getAll', getAllDoctors);

router.get('/getById/:id', authMiddleware, roleMiddleware(['admin']), getDoctorById);



// router.post('/register', async(req, res)=>{
//     try{
//         const doctor = new Doctor(req.body);
//         await doctor.save();
//         res.status(201).json(doctor);
//     }
//     catch(err){
//         res.status(400).json(err);
//     }
// });


// router.post('/login', async(req, res)=>{
//     try{
//         const {email, password} = req.body;
//         const doctor =await Doctor.findOne({email});
//         if(!doctor || !(await bcrypt.compare(password, doctor.password)))
//             return res.status(400).json({error : 'Invalid credentials'});

//         const token = jwt.sign({id: doctor._id, role: doctor.role}, process.env.JWT_SECRET, {expiresIn: '1h'})
//         res.json({token, doctor});
//     }
//     catch(err){
//         res.status(400).json(err);
//     }
// });

// router.delete('/delete', authMiddleware, roleMiddleware(['doctor']), async (req, res)=>{
//     const {id} = req.params;

//     try{
//         const doctor = await Doctor.findByIdAndDelete(id);

//         if(!doctor) return res.status(404).json({error: 'Doctor not found'});

//         res.status(200).json({message: 'Doctor deleted'});
//     }
//     catch(err){
//         console.log(err);
//         res.status(400).json({error:'Something went wrong, doctor not deleted'});
//     }
// });

module.exports = router;


