const mongoose = require('mongoose');
const Author = require('./modelauthor');
const Category = require('./modelcategory');


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        validate: {
            validator: (value) => ifCategoryExists(value),
            message: 'Category does not exist'
        }
    },
    author_id: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Author',
        required: true,
        validate: {
            validator: (value) => ifAuthorExists(value),
            message: 'Author does not exist'
        }
    }
}, { timestamps: true });

const ifAuthorExists = async function(value) {
    try{
        const author = await Author.findOne({"_id":value});
        return author;
    }
    catch(err){
        return false;
    }
};

const ifCategoryExists = async function(value) {
    try{
        const category = await Category.findOne({"_id":value});
        return category;
    }
    catch(err){
        return false;
    }
};

module.exports = mongoose.model('Book', bookSchema);