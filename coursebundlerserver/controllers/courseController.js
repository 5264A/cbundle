import { catchAsyncError } from '../middlewares/catchAsyncError.js'
import {Course} from '../models/Course.js'
import ErrorHandler from '../utils/errorHandler.js'
export const getAllCourse = catchAsyncError(async (req,res,next) => {
    // at starting we have to only serve courses for user not lectures 
    const courses = await Course.find().select("-lectures");
    res.status(200).json({
       success:true,
       courses
    })
})

export const createCourse = catchAsyncError(async(req,res,next) => {
      const {title,description,category,createdBy} = req.body;

      if(!title || !description || !category || !createdBy){
           return next(new ErrorHandler("Please Add All feild",400))
      }

      // for poster upload we use multer
    //   const file = req.file;
      await Course.create({
        title,description,category,createdBy,
        poster:{
            public_id:"temp",
            url:"temp"
        }
      })

      res.status(201).json({
         success:true,
         message:"Course Created Succesfully"
      })
})