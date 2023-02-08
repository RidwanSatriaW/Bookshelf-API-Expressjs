import mongoose from 'mongoose';

const Book = mongoose.Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    author: { type: String, required: true },
    summary: { type: String, required: true },
    publisher: { type: String, required: true },
    pageCount: { type: Number, required: true },
    readPage: { type: Number, required: true },
    finished: { type: Boolean, required: true },
    reading: { type: Boolean, required: true },
    insertedAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
});

export default mongoose.model('Books', Book);