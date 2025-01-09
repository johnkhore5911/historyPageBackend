import User from "../model/userModel.js"

// export const create = async (req , res)=>{
//     console.log("12345")
//     try{
//         const {name,email,address}=req.body;
//         const userExist = await User.findOne ({email})
//         if(userExist){
//             return res.status(400).jason({message : "user already exists."});
//         } 
//         const savedUser=await userData.save();
//         res.status(200).json(savedUser);
//     }catch(error){
//         res.status(500).json({error:"Internal server error."});
//     }
// }

export const createABC = async (req, res) => {
    try {
        const { title, description } = req.body; // Extract title and description from request body

        // Ensure images are uploaded and processed
        // const imageUrls = req.images; // This array is set by the uploadMultiple middleware

        // if (!imageUrls || imageUrls.length === 0) {
        //     return res.status(400).json({ message: "No images provided" });
        // }

        // Create a new user document
        const  newUser = new User({
            title,
            // Image: imageUrls,
            description,
        });

        // Save to database
        await newUser.save();

        res.status(201).json({
            message: "Data saved successfully",
            data: newUser,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const create = async (req, res) => {
    console.log("12345");
    try {
        const { title, description } = req.body;
        


        // Create a new user instance
        const userData = new User({
            title,
            description
        });

        // Save the user to the database
        const savedUser = await userData.save();
        res.status(200).json(savedUser);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Internal server error." });
    }
};


export const fetch = async (req , res)=>{
    try{
        const users = await User.find();
        if (users.length == 0){
            return res.status(404).json({message : "User not found."})
        }
        res.status(200).json(users);
    }catch (error){
        res.status(500).json({error:"Internal server error."});
    }
};

export const update = async (req , res) =>{
    try {
        const id = req.params.id;
        const userExist = await User.findOne({_id:id})
        if (!userExist){
            return res.status(404).json({message : "User not found."})
        }
        const updateUser = await User.findByIdAndUpdate(id , req.body , {new:true})
        res.status(201).json(updateUser);
    }catch (error){
        res.status(500).json({error:"Internal server error."});
    }
}

export const deleteUser = async (req , res)=>{
    try{
        const id = req.params.id;
        const userExist = await User.findOne({_id:id})
        if (!userExist){
            return res.status(404).json({message : "User not found."})
        }
        await User.findByIdAndDelete(id);
        res.status(201).json({message:"user deleted successfully."})
    }catch(error){
        res.status(500).json({error:"Internal server error."});
    }
}
