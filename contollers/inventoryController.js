import mongoose from "mongoose";
import { inventoryModel } from "../models/inventoryModel.js";
import { userModel } from "../models/userModel.js";

export async function createInventoryController(req,res){
    console.log("Controller reached"); // Confirm the controller is reached
    console.log("Request Body:", req.body); // Log the request body
    try {
        
            const { email,bloodGroup,quantity } = req.body; // Attempt to extract
        
        //const {email, inventoryType,bloodGroup,quantity} = req.body;

        //validation
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"User not found",
                success:false,
                error
        })
        }

   if(req.body.inventoryType === 'out'){
          const requestedBloodGroup = bloodGroup
          const reqeustedQuantityOfBlood = Number(quantity)
          const organisation = new mongoose.Types.ObjectId(req.body.userId); // Use ObjectId
          //calculate blood quantity

          const totalInOfRequestedBlood = await inventoryModel.aggregate([
            {$match:{
                organisation: organisation,
                inventoryType:"in",
                bloodGroup:requestedBloodGroup
            }},{
                $group:{
                    _id:'$bloodGroup',
                    total:{$sum:'$quantity'}
                }
            }
          ]);
          //console.log("Total in:", totalInOfRequestedBlood)
          const totalIn= totalInOfRequestedBlood[0]?.total||0;
          const totalOutOfRequestedBlood = await inventoryModel.aggregate([
            {$match:{
                organisation: organisation,
                inventoryType:"out",
                bloodGroup:requestedBloodGroup
            }},{
                $group:{
                    _id:'$bloodGroup',
                    total:{$sum:'$quantity'}
                }
            }
          ]);
 
const totalOut = totalOutOfRequestedBlood[0]?.total || 0
             

   const availableQuantityOfBloodGroup = totalIn-totalOut;

   if(availableQuantityOfBloodGroup<reqeustedQuantityOfBlood){
     return res.status(500).json({
        success:false,
        message:`Only ${availableQuantityOfBloodGroup} of ${requestedBloodGroup.toUpperCase()} is available`
     })
   }

   req.body.hospital=user?._id;
   }else{
    req.body.donar=user?._id
   }


       const inventory = new inventoryModel(req.body);
         await inventory.save();
         return res.status(200).json({
            message:"new blood record added",
            success:true,
            inventory
    })


        }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error in Create Inventory Controller",
            success:false,
            error
    })
}
}

export async function getInventoryController(req,res){
    try {
        console.log(req.body.userId);
        const inventory = await inventoryModel.find({organisation:req.body.userId}).populate("donar").populate("hospital").sort({createdAt:-1});
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.status(200).json({
            message:"got all records successfully",
            success:true,
            inventory
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error in get Inventory Controller",
            success:false,
            error
    })
    }
}

//Get Hospital Blood Records

export async function getInventoryHospitalController(req,res){
    try {
       // console.log(req.body.userId);
        const inventory = await inventoryModel.find(req.body.filters).populate("donar").populate("hospital").populate("organisation").sort({createdAt:-1});
       /* res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');*/
        res.status(200).json({
            message:"got all Hospital Blood records successfully",
            success:true,
            inventory
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error in get Hospital Inventory Controller",
            success:false,
            error
    })
    }
}

//get blood record of 3

export async function getRecentInventoryController(req,res){
    try {
        const inventory = await inventoryModel.find({
            organisation: req.body.userId
        }).limit(3).sort({createdAt:-1})

        return res.status(200).send({
            success:true,
            message:"Recent Inventory data",
            inventory
        })
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            success:false,
            message:'Error in get Recent Inventory Controller',
            error

        })
    }
}
//get donar records

export async function getDonarsController(req,res){
    try {
        const organisation = req.body.userId;
        const donorId= await inventoryModel.distinct("donar",{organisation})
        //console.log(donorId)

        const donars=await userModel.find({_id:{$in: donorId}});
        return res.status(200).send({
            success:true,
            message:"Donar record fetched successfully",
            donars
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
               success:false,
               message:"Error in get Donars Controller",
               error
        })
    }
}

export async function getHospitalsController(req,res){
    try {
        const organisation = req.body.userId;
        const hospitalId = await inventoryModel.distinct("hospital",{organisation})
        //console.log(hospitalId)

        const hospitals = await userModel.find({
            _id:{$in:hospitalId}
        })

        return res.status(200).json({
            success:true,
            message:"Hospital Record fetched successfully",
            hospitals
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'Error in get hospitals controller',
            error
        })
    }
}

export async function getOrganisationController(req,res){
    try {
       /* const donar = req.body.userId;
        const orgId = await inventoryModel.distinct("organisation",{donar})
        //console.log(hospitalId)

        const organisations = await userModel.find({
            _id:{$in:orgId}
        })*/

            const organisations = await userModel.find({ role: 'organisation' });

        return res.status(200).json({
            success:true,
            message:"Organisation Record fetched successfully",
            organisations
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'Error in get Organisation controller',
            error
        })
    }
}


export async function getOrganisationForHospitalController(req,res){
    try {
        const hospital = req.body.userId;
        const orgId = await inventoryModel.distinct("organisation",{hospital})
        //console.log(hospitalId)

        const organisations = await userModel.find({
            _id:{$in:orgId}
        })

           // const organisations = await userModel.find({ role: 'organisation' });

        return res.status(200).json({
            success:true,
            message:"Hospital Organisation Record fetched successfully",
            organisations
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'Error in get Hospital Organisation controller',
            error
        })
    }
}