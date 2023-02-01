const Book = require('../../model/modelbook');

exports.store = async (req, res) => {
    console.log(req.body);
    try{
        const book = new Book({
            title: req.body.title,
            category_id: req.body.category_id,
            author_id: req.body.author_id
        });

        await book.save();
        return res.send(book);
    }catch(err){
        return res.status(500).send({
            message: err.message || "Some error occurred while creating the Book."
        });
    }
}

exports.list = async (req, res) => {
    try{
        const books = await Book.find()
                        .populate('category_id', 'name')
                        .populate('author_id', ['name', 'image']);
                        
        return res.send(books);
    }catch(err){
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving books."
        });
    }
}

exports.destroy = async (req, res) => {
    try{
        const book = await Book.findByIdAndRemove(req.params.id);
        if(!book) res.status(404).send({message: "Book not found with id " + req.params.id});
        return res.send({message: "Book deleted successfully!"});
    }catch(err)
    {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete book with id " + req.params.id
        });
    }
}