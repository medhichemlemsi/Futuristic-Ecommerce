const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler =require('express-async-handler') ;


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};


const authUser =asyncHandler( async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            msg:"Login Succesful " ,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});



const registerUser =asyncHandler( async (req, res) => {
    const user = { ...req.body }
    const email = user.email
    const searchRes = await User.findOne({ email })

    if (searchRes) return res.status(403).json({ msg: "Email already exist" })

    try {
        const newUser = await new User({ ...user })

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newUser.password, salt)

        newUser.password = hash

        await newUser.save()
        res.status(200).json({ msg: "user added successfuly" })

    } catch (error) {
        console.log(error)
        res.status(401).json({ msg: "User register failed" })
    }

});




// // @desc    Fetch user profile
// // @route   GET /api/users/profile
// // @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Fetch all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});
module.exports={ getUsers,updateUserProfile,getUserProfile,registerUser,authUser };