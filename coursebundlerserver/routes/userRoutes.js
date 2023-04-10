import express from "express"
import { addToPlaylist, changePassword, forgetPassword, getMyProfile, login, logout, register, removeFromPlaylist, resetPassword, updateProfile, updateProfilePicture } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

// register
router.route('/register').post(register)

// login
router.route('/login').post(login)

//logout
router.route('/logout').get(logout)

// my profile
router.route('/me').get( isAuthenticated, getMyProfile)

// change password
router.route('/changepassword').put( isAuthenticated, changePassword)

// update profile
router.route('/updateprofile').put( isAuthenticated, updateProfile)

// update profile pic 
router.route('/updateprofilepicture').put( isAuthenticated, updateProfilePicture)

// forget password
router.route('/forgetpassword').post(forgetPassword)

// resetPassword
router.route('/resetpassword/:token').put(resetPassword)

//addtoplaylist
router.route('/addtoplaylist').post(isAuthenticated, addToPlaylist)

//removefromplaylist
router.route('/removefromplaylist').delete(isAuthenticated, removeFromPlaylist)

export default router;