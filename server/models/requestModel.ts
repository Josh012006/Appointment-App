import mongoose from "mongoose";


const requestSchema = new mongoose.Schema({
    patientInfo: {
        patientID: String,
        name: String,
        mail: String,
        phone: String,
        age: String,
        height: String,
        weight: String,
        placeOfBirth: String,
        profession: String,
        gender: String,
        specialty: String,
        description: String,
        background: String,
    },
    doctorInfo: {
        doctorId: String,
        medID: String,
        medName: String,
    },
    hospital: String,
    status: {
        type: String,
        default: "En attente",
    },
    appointID: {
        type: String,
        default: "",
    },
}, { timestamps: true });


const requestModel = mongoose.models.request || mongoose.model('request', requestSchema);

export default requestModel;