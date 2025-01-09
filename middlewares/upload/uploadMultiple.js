//import express from "express" 
//import multer from "multer"
//import cloudinary from "cloudinary"
//import asyncHandler from "express-async-handler" 

//const exress=require("express");
//const multer=require("multer");
//const cloudinary=require("cloudinary").v2;
//const asyncHandler=require("express-async-handler");

//configure cloudinary
// cloudinary.config({
//     cloud_name:process.env.APP_CLOUDINARY_CLOUD_NAME ,
//     api_key:process.env.APP_CLOUDINARY_API_KEY ,
//     api_secret:process.env.APP_CLOUDINARY_SECRET_KEY ,
// });

// const uploadMultiple = asyncHandler(async(req , res , next)=> {
//     try{
//         const images=req.files;
//         console.log(images);
//         const imageurls=[];
// console.log('working1');
//         for (const image of images) {
//             const result = await cloudinary.uploader.upload(image.path , {
//                 resource_type:"auto"
//             });
//         }
//         console.log('working2');
//         req.images = imageurls;
//         console.log(req.images);

//         next()
//         console.log('working3');//cont. to the next logic or controller

//     }catch(error){
//         console.log('error');
//         res.status(500).send("Internal error at: uploadMultiple.js - ${error}")
//     }
// });
// export default uploadMultiple; 



import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import asyncHandler from "express-async-handler";
import User from "../../model/userModel.js"
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
    cloud_name:process.env.APP_CLOUDINARY_CLOUD_NAME ,
    api_key:process.env.APP_CLOUDINARY_API_KEY ,
    api_secret:process.env.APP_CLOUDINARY_SECRET_KEY ,
});


const uploadMultiple = asyncHandler(async (req, res, next) => {
    try {
        const images = req.files;
        console.log(images);
        const imageurls = [];
console.log("working1");
        for (const image of images) {
            if (!fs.existsSync(image.path)) {
                throw new Error(`File does not exist at path: ${image.path}`);
            }
            const result = await cloudinary.uploader.upload(image.path, {
                resource_type: "auto",
            });
            imageurls.push(result.secure_url);//console.log("result: ",result);
        }
        console.log("working2");
        req.images = imageurls;
        console.log(req.images);

       // next();
       const { title, description } = req.body;
        const  newUser = new User({
                   title,
                   Image: req.images,
                   description,
               });
               await newUser.save();

        res.status(201).json({
            message: "Data saved successfully",
            data: newUser,
        });
        


    } catch (error) {
        console.error("Error during Cloudinary upload:", error);
        res.status(500).send(`Internal error at: uploadMultiple.js - ${error.message}`)
    }
});
export default uploadMultiple; 