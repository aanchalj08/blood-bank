import { inventoryModel } from "../models/inventoryModel.js";
import mongoose from "mongoose";
export async function bloodGroupDetailsController(req,res){
    try {
        const bloodGroups=['O+','O-','A+','A-','B+','B-','AB+','AB-'];
        const bloodGroupData = [];
        const organisation = new mongoose.Types.ObjectId(req.body.userId);
        //get single blood group

        await Promise.all(bloodGroups.map(async(bloodGroup)=>{
            //count total in
            const totalIn  = await inventoryModel.aggregate([
                {
                    $match:{
                        bloodGroup:bloodGroup,
                        inventoryType: 'in',
                        organisation
                    }
                },
                {
                    $group:{
                        _id:null,
                        total: { $sum:'$quantity'}
                    }
                }
            ])

            //count total out
            const totalOut  = await inventoryModel.aggregate([
                {
                    $match:{
                        bloodGroup:bloodGroup,
                        inventoryType: 'out',
                        organisation
                    }
                },
                {
                    $group:{
                        _id:null,
                        total: { $sum:'$quantity'}
                    }
                }
            ])

            //calculate total
            const availableBlood = (totalIn[0]?.total || 0)-(totalOut[0]?.total || 0);
            //PUSH DATA
            bloodGroupData.push({
                bloodGroup,
                totalIn:totalIn[0]?.total || 0,
                totalOut:totalOut[0]?.total || 0,
                availableBlood
            })
        }))
        return res.status(200).send({
            success:true,
            message:"Blood Group Data fetched successfully",
            bloodGroupData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in Blood Group Detail Controller",
            error
        })
    }
}