import mongoose from 'mongoose';


const patientSchema = new mongoose.Schema({
    type: { 
        type: String, 
        enum: ['pat'], 
        default: 'pat' 
    },
    lastName: String,
    firstName: String,
    mail: String,
    password: String,
    phone: String,

    region: String,
    appointments: {
        type: String,
        default: {}
    }
});

const patientModel = mongoose.model('patient', patientSchema);



const secretarySchema = new mongoose.Schema({
    type: { 
        type: String, 
        enum: ['sec'], 
        default: 'sec' 
    },
    lastName: String,
    firstName: String,
    mail: String,
    password: String,
    phone: String,

    hospital: String,
    medID: String
});

const secretaryModel = mongoose.model('secretary', secretarySchema);



const doctorSchema = new mongoose.Schema({
    type: { 
        type: String, 
        enum: ['med'], 
        default: 'med' 
    },
    lastName: String,
    firstName: String,
    mail: String,
    password: String,
    phone: String,

    hospital: String,
    medID: [String]
});

const doctorModel = mongoose.model('doctor', doctorSchema);

