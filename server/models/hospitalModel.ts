import mongoose from 'mongoose';




const hospitalSchema = new mongoose.Schema({
    hospitalName: String,
    region: String,
    phoneNumber: String,
    address: String,
    lat: Number,
    lng: Number,
    availableSpecialities: {
        type: [String],
        default: []
    },
    doctorsID : {
        type: [String],
        default: []
    }
});

const hospitalModel = mongoose.models.hospital || mongoose.model('hospital', hospitalSchema);

export default hospitalModel;