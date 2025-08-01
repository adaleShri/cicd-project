require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');


const doctorRoutes = require('./routes/doctorRoutes');
const receptionistRoutes = require('./routes/receptionistRoutes');
const patientRoutes = require('./routes/patientRoutes');
const loginRoute = require('./routes/loginRoute');

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();
connectDB();

app.use(bodyParser.json());

//app.use(cors(corsOptions));
app.use(cors());
app.use('/api/doctors', doctorRoutes);
app.use('/api/receptionist', receptionistRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/auth', loginRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));