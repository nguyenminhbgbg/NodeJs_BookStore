const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Book = new Schema(
    {
        _id: { type: Number },
        bookName: { type: String, required: true },
        bookCover: { type: String, required: true },
        rating: { type: String },
        language: { type: String },
        pageNo: { type: String, required: true },
        author: { type: String, required: true },
        genre: { type: String, required: true },
        readed: { type: String },
        description: { type: String },
        backgroundColor: { type: String },
        navTintColor: { type: String, required: true },
        completion: { type: String, required: true },
        lastRead: { type: String, required: true },

    },
    { 
        id: false,
        timestamps: true,
    },
);

// add plugins
mongoose.plugin(slug);
Book.plugin(AutoIncrement);
Book.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Book', Book);
