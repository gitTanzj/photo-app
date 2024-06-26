import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: false
    },
    image_address: {
        type: String,
        required: true
    },
    alt_text: {
        type: String,
        required: false
    },
    image_public_id: {
        type: String,
        required: true
    }
})

export default mongoose.model('Image', imageSchema);