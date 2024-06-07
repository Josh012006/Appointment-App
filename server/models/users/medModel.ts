import mongoose from 'mongoose';

import userModel from './users/userModel';


const doctorSchema = new mongoose.Schema({
    hospital: String,
    medID: String,
    speciality: [String]
});

const doctorModel = mongoose.models.doctor || userModel.discriminator('doctor', doctorSchema, 'user');

export default doctorModel;

