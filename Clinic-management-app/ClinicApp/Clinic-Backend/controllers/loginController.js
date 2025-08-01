const Doctor = require('../models/Doctor');
const Receptionist = require('../models/Receptionist');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function handleLogin(req, res) {
    const { email, password } = req.body;

    try {
        let user = await Doctor.findOne({ email });
        let role;

        if (!user) {
            user = await Receptionist.findOne({ email });
            
        }
        //let role = user.role;

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        role = user.role;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { id: user._id, role:user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: `${role.charAt(0).toUpperCase() + role.slice(1)} logged in successfully`,
            token, user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
};

module.exports = { handleLogin };