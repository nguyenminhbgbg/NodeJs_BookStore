const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Chapter = new Schema(
    {
        bookId: { type: String, required: true },
        chapterName: { type: String, required: true },
        content: { type: String, required: true },
        NumberChapter: { type: String, required: true },
        
        slug: { type: String, slug: 'chapterName', unique: true },
    },
    { timestamps: true },
);

mongoose.plugin(slug);
Chapter.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('book_detail', Chapter);
