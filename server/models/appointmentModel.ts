import mongoose from "mongoose";



const appointmentSchema = new mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
    status: String,
    hospital: String,
    medName: String,
    medID: String,
    medSpecialty: String,
});

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);

export default appointmentModel;