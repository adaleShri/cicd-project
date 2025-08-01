const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Receptionist = require('../models/Receptionist');

async function handleReceptionistLogin(req, res) {
    const { email, password } = req.body;
    const receptionist = await Receptionist.findOne({ email });
    if (!receptionist || !(await bcrypt.compare(password, receptionist.password)))
        return res.status(400).json({ error: 'Invalid Credentials' });

    const token = jwt.sign({ id: receptionist._id, role: receptionist.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, receptionist });
}

async function handleReceptionistSignup(req, res) {
    try {
        const receptionist = new Receptionist(req.body);
        await receptionist.save();
        res.status(201).json(receptionist);
    }
    catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
}

async function getAllReceptionist(req, res) {
    try {
        const receptionists = await Receptionist.find();
        res.status(200).json(receptionists);
    }
    catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
}

async function getReceptionistById(req, res){
    const {id} = req.params;
    try{
        const receptionist = await Receptionist.findById(id);
        if(!receptionist) return res.status(400).json({error:' Receptionist not found'});

        res.status(200).json({message: 'Receptionist found', receptionist}); 
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:' Something not found'});
    }
}

async function handleDeleteReceptionist(req, res) {
    const { id } = req.params;
    try {
        const receptionist = await Receptionist.findByIdAndDelete(id);

        if (!receptionist)
            return res.status(404).json({ error: 'Receptionist not found' });

        res.status(200).json({ message: "Receptionist deleted" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

async function handleUpdateReceptionist(req, res){
    const {id} = req.params;
    const {firstName, lastName, phoneNumber, email, password, clinicAddress} = req.body;
    try{
        const updateData = {firstName, lastName, phoneNumber, email, clinicAddress};

        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateData.password = hashedPassword;
        }
        const receptionist = await Receptionist.findByIdAndUpdate(
            id,
            updateData,
            {new:true, runValidators:true}
        );

        if(!receptionist) return res.status(400).json({error:' receptionist not found'});

        res.status(200).json({message:'Receptionist Details updated'})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Details not updated'});
    }
}


module.exports = {
    handleReceptionistLogin,
    handleReceptionistSignup,
    getAllReceptionist,
    handleDeleteReceptionist,
    handleUpdateReceptionist,
    getReceptionistById

}