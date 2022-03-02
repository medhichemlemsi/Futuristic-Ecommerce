const express = require("express")


const { admin, protect }= require('../middlewares/authAdmin');
const { authUser,
    registerUser,
   getUserProfile,
    updateUserProfile,
    getUsers,
}=require('../controllers/userControllers') ;


const Router = express.Router()


Router.route('/').post(registerUser).get(protect, admin, getUsers);
Router.post('/login', authUser);
Router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);


module.exports = Router