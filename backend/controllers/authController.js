const User = require('../models/User')
const jwt = require("jsonwebtoken");

//Generate JWT token
   const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

};

//registerUser
exports.registerUser = async (req, res) => {
    console.log("Incoming request body:", req.body); // Debugging log

    const { fullName, email, password, profileImageUrl } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });

    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

//Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try{
        const user = await User.findOne({ email });
        if (!user ||!(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        })
    } catch (err) {
        console.error("Error logging in user:", err);
        res.status(500).json({ message: "Error logging in user", error: err.message });
    }
};

//Get user info 
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
       
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.error("Error getting user info:", err);
        res.status(500).json({ message: "Error getting user info", error: err.message });
    }
};


