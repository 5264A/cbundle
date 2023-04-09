import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import {User} from "../models/User.js"
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";

 export const register =  catchAsyncError(async (req,res,next) =>{
          const {name,email,password} = req.body;
          if(!name || !email || !password){
                 return next(new ErrorHandler("Please Enter All feilds"))
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