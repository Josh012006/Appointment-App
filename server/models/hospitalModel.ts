import mongoose from 'mongoose';




const hospitalSchema = new mongoose.Schema({
    hospitalName: String,
    region: String,
    availableSpecialities: [String],
    doctorsID : [String]
});

const hospitalModel = mongoose.models.hospital || mongoose.model('hospital', hospitalSchema);

export default hospitalModel;