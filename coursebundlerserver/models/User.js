import mongoose from "mongoose";
import validator from "validator"
const schema = mongoose.Schema({
// Name type, required
name:{
    type:String,
    required:[true,"Please Enter Your Name"]
},
// Email type, required, unique, validate
email:{
    type:String,
    required:[true,"Please Enter Your Email"],
    unique:true,
    validate:validator.isEmail,
},
// Password type, required, minLength, select
password:{
     type:String,
     required:[true,"Please Enter Your Password"],
     minLength:[8,"Password Must be greater than 8 chars.."],
     select:fasle
},
// Role type, enum, default
role:{
    type:String,
    enum:["admin","user"],
    default:"user"
},
// Subscription id, status
subscription:{
    id:String,
    status:String
},
// Avatar public_id, url
avatar:{
    public_id:{
         type:String,
         required:true
     },
     url:{
        type:String,
        required:true
    },
},
// Playlist [ courseId,poster ]
playlist:[
    {
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        },
        poster:String
    }
],
// CreatedAt type, default
createdAt:{
    type:Date,
    default:Date.now
},
ResetPasswordToken: String,
ResetPasswordExpire: String
});

export const User = mongoose.model("User",schema);