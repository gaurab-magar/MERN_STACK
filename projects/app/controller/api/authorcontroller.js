
const Author = require('../../model/modelauthor');

// Create and Save a new Author
exports.store = async (req, res) => {
    console.log(req.body);
    try{
        const author = new Author({
            name: req.body.name,
            image: req.body.image
        });
    
        await author.save();
        return res.send(author);
    }catch(err){
        return res.status(500).send({
            message: err.message || "Some error occurred while creating the Author."
        });
    }
};



exports.list = async (req, res) => {
    try{
        const authors = await Author.find();
        return res.send(authors);
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
        return res.send({message: "Author deleted successfully!"});
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