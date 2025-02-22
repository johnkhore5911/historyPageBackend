import express from "express"
import { fetch , createABC , update, deleteUser} from "../controller/userController.js"
// import upload from "../../backend practice/middlewares/multer/multer.js"
import upload from '../middlewares/multer/multer.js'
// import uploadMultiple from "../../backend practice/middlewares/upload/uploadMultiple.js"

import uploadMultiple from '../middlewares/upload/uploadMultiple.js'
//const upload = require ("../../middlewares/multer/multer.js");
//const uploadMultiple = require("../../middlewares/upload/uploadMultiple.js");

const  route = express.Router();

route.post("/create",createABC);
route.get("/getAllUsers",fetch);
route.put("/update/:id",update);
route.delete("/delete/:id",deleteUser);
route.post("/createImg",upload.array("images"), uploadMultiple);

export default route ;