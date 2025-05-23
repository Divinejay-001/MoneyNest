const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    registerUser,
    loginUser,
    getUserInfo,
} = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
    console.log("Uploaded file:", req.file); // Log the uploaded file info

    if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded.' });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

// Global error handler for catching any errors
router.use((err, req, res, next) => {
    console.error("Error occurred:", err.stack);
    res.status(500).json({ message: err.message || "Internal Server Error" });
});

module.exports = router;
