import mongoose from 'mongoose';




const userSchema = new mongoose.Schema({
    type: { 
        type: String, 
        enum: ['pat', 'sec', 'med'] 
    },
    lastName: String,
    firstName: String,
    mail: String,
    password: String,
    phone: String
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;