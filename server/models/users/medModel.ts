import mongoose from 'mongoose';

import userModel from './userModel';


const doctorSchema = new mongoose.Schema({
    hospital: String,
    medID: String,
    gender: String,
    speciality: [String]
});

const doctorModel = mongoose.models.doctor || userModel.discriminator('doctor', doctorSchema, 'user');

export default doctorModel;

