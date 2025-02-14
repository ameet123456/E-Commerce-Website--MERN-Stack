const Banner = require('../models/banner_model');

const uploadBanner = async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Log body data
      console.log("Uploaded File:", req.file); // Log file data
  
      const { title, description, startTime, endTime, alwaysDisplay, link } = req.body;
      const bannerImage = req.file?.path;
  
      if (!bannerImage) {
        return res.status(400).json({ message: 'Banner image is required' });
      }
  
      if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required fields" });
      }
  
      let start = alwaysDisplay ? null : startTime;
let end = alwaysDisplay ? null : endTime;
if (!alwaysDisplay && (!startTime || !endTime)) {
  return res.status(400).json({
    message: "Start time and end time are required if alwaysDisplay is false",
  });
}
  
      const banner = new Banner({
        title,
        description,
        startTime: start,
        endTime: end,
        alwaysDisplay,
        link,
        image: bannerImage,
      });
  
      await banner.save();
      res.status(201).json({ message: "Banner created successfully", banner });
    } catch (err) {
      console.error(err); // Log the error
      res.status(500).json({ error: "Failed to create banner", details: err.message });
    }
  };

  
const getBanners = async (req,res) =>{
    try {
        const currentTime = new Date();
        const banners = await Banner.find({
          $or: [
            { alwaysDisplay: true }, // Always visible banners
            { startTime: { $lte: currentTime }, endTime: { $gte: currentTime } }, // Time-based banners
          ],
        });
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch banners", details: err.message });
    }
}
const updateBanner = async (req,res) =>{
    try {
        const {bannerId} = req.params;
        const updates = req.body;
    const banner = await Banner.findByIdAndUpdate(id, updates, { new: true });
    if (!banner) return res.status(404).json({ error: "Banner not found" });
    res.status(200).json({ message: "Banner updated successfully", banner });
    } catch (error) {
        res.status(500).json({ error: "Failed to update banner", details: err.message });
    }
}
const deleteBanner = async (req,res) =>{
    try {
        const {bannerId} = req.params;
        const banner = await Banner.findByIdAndDelete(bannerId);
        if (!banner) return res.status(404).json({ error: "Banner not found" });
        res.status(200).json({ message: "Banner deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete banner", details: err.message });
    }
}
const incrementClickCount = async (req,res) =>{
    try {
        const {bannerId} = req.params;
        const banner = await Banner.findByIdAndUpdate(bannerId, { $inc: { clickCount: 1 } }, { new: true });
        if (!banner) return res.status(404).json({ error: "Banner not found" });
        res.status(200).json({ message: "Click count incremented", banner });
    } catch (err) {
        res.status(500).json({ error: "Failed to increment click count", details: err.message });
      }
    };

module.exports = {uploadBanner,getBanners,updateBanner,deleteBanner,incrementClickCount};