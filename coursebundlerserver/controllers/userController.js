import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import {User} from "../models/User.js"
import {Course} from "../models/Course.js"
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";
// register
 export const register =  catchAsyncError(async (req,res,next) =>{
          const {name,email,password} = req.body;
          if(!name || !email || !password){
                 return next(new ErrorHandler("Please Enter All feilds",400))
          }
        //   const file = req.file


        // if user already exists
       let user = await User.findOne({email})
       if(user) return next(new ErrorHandler("User Already Exists",409))


       // upload file on clodnary


        user =  await User.create({
            name,email,password,
            avatar:{
                public_id : "temp ",
                 url: "temp",
            },
        })
        
    sendToken(res, user, "Registered Successfully", 201);
})

//login
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please enter all field", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new ErrorHandler("Incorrect Email or Password", 401));

  sendToken(res, user, `Welcome back, ${user.name}`, 200);
});

// logout
export const logout = catchAsyncError(async (req, res, next) => {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        // secure: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  });

  // get profile
  export const getMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
  
    res.status(200).json({
      success: true,
      user,
    });
  });


  export const changePassword = catchAsyncError(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword)
      return next(new ErrorHandler("Please enter all field", 400));
  
    const user = await User.findById(req.user._id).select("+password");
  
    const isMatch = await user.comparePassword(oldPassword);
  
    if (!isMatch) return next(new ErrorHandler("Incorrect Old Password", 400));
  
    user.password = newPassword;
  
    await user.save();
  
    res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
    });
  });
  
  export const updateProfile = catchAsyncError(async (req, res, next) => {
    const { name, email } = req.body;
  
    const user = await User.findById(req.user._id);
  
    if (name) user.name = name;
    if (email) user.email = email;
  
    await user.save();
  
    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
    });
  });


// update profile picture
export const updateProfilePicture = catchAsyncError(async (req,res,next) => {
 
  res.status(200).json({
     success:true,
     message:"Profile Pic Updated Successfully"
  })
})

// forgetPassword
export const forgetPassword = catchAsyncError(async (req,res,next) => {
   const {email} = req.body
   if(!email) return next(new ErrorHandler("Please Enter Email",400))
    const user = await User.findOne({email})
    if(!user) return next(new ErrorHandler("User Not found",400))
    const resetToken = await user.getResetToken()

    await user.save();

    // send token by email
    const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
    
    const message = `Click on the link to reset your password. ${url}. If you have not request then please ignore.`;
    
    await sendEmail(user.email, "Garib-Sikshha Reset Password", message);
  
     res.status(200).json({
     success:true,
     message:`Reset Token has been sent to ${user.email}`
  })
})


// resetpassword
export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user)
    return next(new ErrorHandler("Token is invalid or has been expired", 401));

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
});
  

//addtoplaylist
export const addToPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const course = await Course.findById(req.body.id);

  if (!course) return next(new ErrorHandler("Invalid Course Id", 404));

  const itemExist = user.playlist.find((item) => {
    if (item.course.toString() === course._id.toString()) return true;
  });

  if (itemExist) return next(new ErrorHandler("Item Already Exist", 409));

  user.playlist.push({
    course: course._id,
    poster: course.poster.url,
  });

  await user.save();

  res.status(200).json({
    success: true,
    message: "Added to playlist",
  });
});

// remove from playlist
export const removeFromPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.query.id);
  if (!course) return next(new ErrorHandler("Invalid Course Id", 404));

  const newPlaylist = user.playlist.filter((item) => {
    if (item.course.toString() !== course._id.toString()) return item;
  });

  user.playlist = newPlaylist;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Removed From Playlist",
  });
});