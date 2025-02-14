const express = require('express');
const router = express.Router();
const  {getAllCategory,createCategory}= require('../controller/CategoryController');


    
router.get('/get-category', getAllCategory);
router.post('/create', createCategory);

module.exports = router;