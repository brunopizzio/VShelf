const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({

    name: { type: String, require: true },
    author: { type: String, require: true },
    nPages: { type: Number, require: true },
    createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model('Book', BookSchema);