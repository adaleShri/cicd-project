const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const Receptionist = require('../models/Receptionist');
//const Patient = require('../models/Patient');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { handleReceptionistLogin,
        handleReceptionistSignup,
        getAllReceptionist,
        handleDeleteReceptionist,
        handleUpdateReceptionist,
        getReceptionistById } = require('../controllers/receptionistController');
const router = express.Router();

router.post('/login', handleReceptionistLogin);

router.post('/register', authMiddleware, roleMiddleware(['doctor','admin']), handleReceptionistSignup);

// router.get('/all', authMiddleware, roleMiddleware(['doctor','admin']), getAllReceptionist);

router.get('/all', getAllReceptionist);

router.delete('/delete/:id', authMiddleware, roleMiddleware(['doctor','admin']), handleDeleteReceptionist);

router.put('/update/:id', authMiddleware, roleMiddleware(['doctor','admin']), handleUpdateReceptionist);

router.get('/getById/:id', authMiddleware, roleMiddleware(['doctor','admin', 'receptionist']), getReceptionistById);

// router.post('/login', async(req, res)=>{
//     const {email, password} = req.body;
//     const receptionist = await Receptionist.findOne({email});
//     if(!receptionist || !(await bcrypt.compare(password, receptionist.password)))
//         return res.status(400).json({error: 'Invalid Credentials'});

//     const token = jwt.sign({id: receptionist._id, role: receptionist.role}, process.env.JWT_SECRET, {expiresIn:'1h'});
//     res.json({token, receptionist});
// });



// router.post('/register', authMiddleware, roleMiddleware('doctor'), async(req, res)=>{
//     try{
//         const receptionist = new Receptionist(req.body);
//         await receptionist.save();
//         res.status(201).json(receptionist);
//     }
//     catch(err){
//         res.status(400).json(err);
//         console.log(err);
//     }
// });

// router.get('/all', authMiddleware, roleMiddleware('doctor'), async(req, res)=>{
//     try{
//         const receptionists = await Receptionist.find();
//         res.status(200).json(receptionists);
//     }
//     catch(err){
//         res.status(400).json(err);
//         console.log(err);
//     }
// });

// router.delete('/delete', authMiddleware, roleMiddleware('doctor'), async(req, res)=>{
//     const {id} = req.params;
//     try{
//         const receptionist = await Receptionist.findByIdAndDelete(id);

//         if(!receptionist) 
//             return res.status(404).json({error: 'Receptionist not found'});

//         res.status(200).json({message: "Receptionist deleted"});
//     }
//     catch(err){
//         console.error(err);
//         res.status(500).json({ error: 'Server error' });
//     }
// })

module.exports = router;