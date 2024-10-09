import { userModel } from "../models/userModel.js";

export async function adminMiddleware(req,res,next){
    try {
        const user = await userModel.findById(req.body.userId);
        if(user?.role !== 'admin'){
            return res.status(401).send({
                success:false,
                message:"Auth failed"
            })
        }else{
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"Error in Admin Middleware",
            error
        })
    }
}
