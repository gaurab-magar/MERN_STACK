const Category = require('../../model/modelcategory');
exports.create= async(req,res)=>{
    return res.render('category/create')
};

exports.store = async (req, res) => {
    // res.send("Hre")
    try{
        const category = new Category({
            name: req.body.name
        });
    
        await category.save();
        return res.redirect('/category');
    }catch(err){
        return res.status(500).send({
            message: err.message || "Some error occurred while creating the Category."
        });
    }
}
exports.login = (req,res)=>{
    res.render('category/login')
}

exports.list = async (req, res) => {
    try{
        const categories = await Category.find();
        return res.render('category', {categories:categories});
    }catch(err){
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving categories."
        });
    }
}

exports.destroy = async (req, res) => {
    try{
        const category = await Category.findByIdAndRemove(req.params.id);
        if(!category) res.status(404).send({message: "Category not found with id " + req.params.id});
        return res.redirect({message: "Category deleted successfully!"});
    }catch(err)
    {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete category with id " + req.params.id
        });
    }
}