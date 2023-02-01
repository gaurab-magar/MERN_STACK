const Author = require('../../model/modelauthor');



exports.create = async (req, res) => {
    return res.render('author/create');
}

// Create and Save a new Author
exports.store = async (req, res) => {
    try{
        const author = new Author({
            name: req.body.name,
            image: req.body.image
        });
    
        await author.save();
        return res.redirect('/author');
    }catch(err){
        return res.status(500).send({
            message: err.message || "Some error occurred while creating the Author."
        });
    }
};





exports.list = async (req, res) => {
    try{
        const authors = await Author.find();
        return res.render('author', {authors: authors});
    }catch(err){
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving authors."
        });
    }
}

exports.index = async (req, res) => {
    try{
        const authors = await Author.find();
        return res.render('author/index', {authors: authors});
    }catch(err){
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving authors."
        });
    }
}

exports.destroy = async (req, res) => {
    try{
        const author = await Author.findByIdAndRemove(req.params.id);
        if(!author) res.status(404).send({message: "Author not found with id " + req.params.id});
        return res.redirect('/author');
    }catch(err){
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Author not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete author with id " + req.params.id
        });
    }
};