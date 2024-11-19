import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    message:{
        type: String,
        required: true
    }

}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
