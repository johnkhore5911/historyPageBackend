import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./route/userRoute.js"


const app = express();
app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGOURL=process.env.MONGOURL;

mongoose
.connect(MONGOURL)
.then(()=>{
    console.log('database connected successfully')
    app.listen(PORT,()=>{
        console.log('server is running on '+PORT);
    });
})
.catch((error)=>console.log(error));

app.use("/api/user" , route);