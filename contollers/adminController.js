import { userModel } from "../models/userModel.js";

export async function getDonarsListController(req,res){
    try {
        
        const donarData = await userModel
        .find({role:"donar"})
        .sort({createdAt:-1})

        return res.status(200).send({
            success:true,
            TotalCount:donarData.length,
            message:"Donar Data fetched successfully",
            donarData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in Get Donars List Controller",
            error
        })
    }
}


export async function getHospitalListController(req,res){
    try {
        
        const hospitalData = await userModel
        .find({role:"hospital"})
        .sort({createdAt:-1})

        return res.status(200).send({
            success:true,
            TotalCount:hospitalData.length,
            message:"Hospital Data fetched successfully",
            hospitalData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in Get Hospital List Controller",
            error
        })
    }
}


export async function getOrganisationListController(req,res){
    try {
        
        const organisationData = await userModel
        .find({role:"organisation"})
        .sort({createdAt:-1})

        return res.status(200).send({
            success:true,
            TotalCount:organisationData.length,
            message:"Organisation Data fetched successfully",
            organisationData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in Get Organisation List Controller",
            error
        })
    }
}


//delete donar

export async function deleteDonarController(req,res){
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Record deleted successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
              success:false,
              message:"Error in delete Controller",
              error
        })
    }
}


