import mongoose from 'mongoose';
import colors from 'colors';

export const connectDB = async()=>{
    try{
          await mongoose.connect(process.env.MONGO_URL);
          console.log("Connection to Dtabase is successful".bgGreen)
    }
    catch(error){
           console.log(`MongoDb Database error in db.js ${error}`.bgRed);
    }
}