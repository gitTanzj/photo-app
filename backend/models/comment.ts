import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    date: {
        required: true,
        type: Date
    },
    content: {
        required: true,
        type: String
    },
    post: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    author: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default mongoose.model('Comment', commentSchema);