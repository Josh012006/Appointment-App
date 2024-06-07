import mongoose from 'mongoose';

import userModel from './users/userModel';

const patientSchema = new mongoose.Schema({
    region: String,
    appointments: {
        type: String,
        default: {}
    }
});

const patientModel = mongoose.models.patient || userModel.discriminator('patient', patientSchema, 'user');

export default patientModel;