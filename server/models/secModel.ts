import mongoose from 'mongoose';

import userModel from './userModel';


const secretarySchema = new mongoose.Schema({
    hospital: String,
    medID: String
});

const secretaryModel = mongoose.models.secretary || userModel.discriminator('secretary', secretarySchema, 'user');

export default secretaryModel;