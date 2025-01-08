import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    title:{
        type : String ,
        required : true
    },
    Image:{
        type : String 
    },
    description:{
        type : String ,
        required : true
    },
})

export default mongoose.model("users",userSchema);