import jwt from 'jsonwebtoken';

export async function middleware(req,res,next){
    try {
        
        const token = req.headers['authorization'].split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                return res.status(400).json({
                    success:false,
                    err,
                    message:"Auth failed"
                })
            }
            else{
                req.body.userId=decode.userId;
                next();
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            error,
            message:"Error in Middleware"
        })
    }
}