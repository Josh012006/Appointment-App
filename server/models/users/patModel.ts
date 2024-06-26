import mongoose from 'mongoose';

import userModel from './userModel';

const patientSchema = new mongoose.Schema({
    region: String,
    location: String,
    appointments: {
        type: [String],
        default: []
    },
    requests: {
        type: [String],
        default: []
    }
});

const patientModel = mongoose.models.patient || userModel.discriminator('patient', patientSchema, 'user');

export default patientModel;