const asyncHandler = require('express-async-handler');
const bcrypt = require ('bcrypt');
const user = require('../model/user');
const { constants } = require('../constants');


// desc Register a user
// route POST/api/users/register
// access public
const registerUser = asyncHandler(async(req,res)=>{
    const {name, email, password, mobile, gender, role} = req.body;
    if(!name || !email || !password || !mobile || !gender){
        return res.status(constants.VALIDATION_ERROR).json({ message: 'All feilds are mandatory' });
    }
    const userAvailable = await user.findOne({ email });
    if (userAvailable){
        return res.status(constants.VALIDATION_ERROR).json({ message: 'you already registered' });
    }
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await user.create({
        name,
        email,
        password: hashedPassword,
        mobile,
        gender,
        role
    });

    res.status(constants.SUCCESSFULL_POST).json(newUser);
});



//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error('All fields are mandatory!');
    }

    const User = await user.findOne({ email });
    if (!User) {
        return res.status(constants.UNATHORIZED).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
        return res.status(constants.UNATHORIZED).json({ message: 'Invalid email or password' });
    }

    // Check user role and perform actions accordingly
    if (User.role === 'admin') {
        // Admin actions
        res.status(constants.SUCCESSFULL_REQUEST).json({ message: 'Login successful - Admin' });
    } else {
    // Normal user actions
        res.status(constants.SUCCESSFULL_REQUEST).json({ message: 'Login successful - Normal user' });
    }
});



module.exports ={registerUser, loginUser};