const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const verifyToken = require('../middleware/verifyToken');
const { uploadBanner,getBanners,updateBanner,deleteBanner,incrementClickCount } = require('../controller/banner_controller');

router.get("/getBanner", getBanners);
router.post('/banner', verifyToken, upload.single('image'), uploadBanner);
router.patch("/banner/:id", verifyToken, updateBanner);
router.delete("/banner/:id", verifyToken, deleteBanner);
router.post("/banner/:id/click", verifyToken, incrementClickCount);

module.exports = router;