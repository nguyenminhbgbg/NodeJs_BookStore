const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Genre = new Schema(
    {
        genreName: { type: String, required: true },
        description: { type: String },
        
        slug: { type: String, slug: 'genreName', unique: true },
    },
    { timestamps: true },
);

// add plugins
mongoose.plugin(slug);
Genre.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Genre', Genre);
