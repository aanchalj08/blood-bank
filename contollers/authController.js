
import bcrypt from 'bcryptjs';
import {userModel} from "../models/userModel.js";
import jwt from "jsonwebtoken";

export async function registerController(req,res){
      try {
             const existingUser = await userModel.findOne({email:req.body.email})
             if(existingUser ){
                   return res.status(200).json({
                    success:false,
                    message:"User alredy exists"
                   })
             }

            const salt= await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password,salt);
            req.body.password=hashedPassword;

            const user=new userModel(req.body);
            await user.save();
            return res.status(200).json({
                success:true,
                message:"User registered successfully",
                user
               })

      } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error in register Controller",
            success:false,
            error
        })
      }
}

export async function loginController(req,res){
      try {
          const user = await userModel.findOne({email:req.body.email});
          if(!user){
            return res.status(404).json({
                  success:false,
                  message:"User doesn't exist"
            })
          }
         //check role
         if(user.role !== req.body.role){
            return res.status(404).json({
                  success:false,
                  message:"role doesn't match"
            })
         }

        const comparePassword= await bcrypt.compare(req.body.password,user.password);
        if(!comparePassword){
            return res.status(404).json({
                  success:false,
                  message:"Invalid Credentials"
            })
        }
         
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        return res.status(200).json({
            success:true,
            message:"Login Successful",
            user,
            token
        })
            
      } catch (error) {
            console.log(error);
        res.status(500).json({
            message:"Error in Login Controller",
            success:false,
            error
      })
}
}

export async function currentUserController(req,res){
      try {
            const user = await userModel.findOne({_id:req.body.userId});
           res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
            return res.status(200).json({
                  success:true,
                  messsage:'User fetched successfully',
                  user
            })
           
      } catch (error) {
            console.log(error);
        res.status(500).json({
            message:"Error in CurrentUser Controller",
            success:false,
            error
      })
}
}
