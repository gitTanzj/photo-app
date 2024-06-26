import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    images: {
        type: Array,
        required: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

export default mongoose.model('Post', postSchema)