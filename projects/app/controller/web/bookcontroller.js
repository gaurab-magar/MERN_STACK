const Book = require('../../model/modelbook');
const Author = require('../../model/modelauthor');
const Category = require('../../model/modelcategory');

exports.create = async (req, res) => {
    const authors = await Author.find();
    const categories = await Category.find();
    return res.render('book/create', {authors: authors, categories: categories});
}

// Create and Save a new book
exports.store = async (req, res) => {
    console.log(req.body);
    try{
        const book = new Book({
            title: req.body.title,
            category_id: req.body.category_id,
            author_id: req.body.author_id
        });
    
        await book.save();
        return res.redirect('/book');
    }catch(err){
        return res.status(500).send({
            message: err.message || "Some error occurred while creating the book."
        });
    }
};



exports.index = async (req, res) => {
    try{
        const books = await Book.find()
                        .populate('category_id', 'name')
                        .populate('author_id', ['name', 'image']);
        return res.render('book/index', {books: books});
    }catch(err){
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving books."
        });
    }
}

exports.destroy = async (req, res) => {
    try{
        const book = await Book.findByIdAndRemove(req.params.id);
        if(!book) res.status(404).send({message: "book not found with id " + req.params.id});
        return res.redirect('/book');
    }catch(err){
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "book not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete book with id " + req.params.id
        });
    }
};