const express = require('express');
const Doctor = require('../models/Doctor');
const Receptionist = require('../models/Receptionist');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {handleLogin} = require('../controllers/loginController');
const router = express.Router();

router.post('/login', handleLogin); 

module.exports = router;