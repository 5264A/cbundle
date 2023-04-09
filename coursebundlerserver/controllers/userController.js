import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import {User} from "../models/User.js"
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";

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


export const login =  catchAsyncError(async (req,res,next) =>{
          const {email,password} = req.body;
          if( !email || !password){
                 return next(new ErrorHandler("Please Enter All feilds",400))
          }
       
        // if user does not exists
       const user = await User.findOne({email}).select("+password")
       if(!user) return next(new ErrorHandler("Incorrect Email or Password",401))
       
       const isMatch = await user.comparePassword(password);

       if(!isMatch) return next(new ErrorHandler("Incorrect Email or Password",401))
        
       sendToken(res, user, `Welcome back ${user.name}`, 200);
})

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

  export const getMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
  
    res.status(200).json({
      success: true,
      user,
    });
  });
  