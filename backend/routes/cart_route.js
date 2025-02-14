const express=require('express');
const router=express.Router();
const {addItemToCart,updateItemQuantity,removeItemFromCart,getCart}=require('../controller/Cart_controller');

router.post('/addItem',addItemToCart);
router.put('/updateItem',updateItemQuantity);
router.get('/getCart',getCart);
router.delete('/deleteItem',removeItemFromCart);

module.exports = router;