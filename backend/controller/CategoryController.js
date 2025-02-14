const Category= require("../models/categories_model");

const getAllCategory = async (req,res)=>{
    try {
        const categories = await Category.find({});
        res.json(categories);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const createCategory = async (req,res)=>{
    try {
        const {name,description,image}= req.body;
        const newCategory = new Category({
            name, description, image
        });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
       res.status(500).json({ error: error.message });
    }
}

module.exports ={
    getAllCategory,createCategory
};