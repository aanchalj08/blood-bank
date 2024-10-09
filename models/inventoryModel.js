import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
     inventoryType:{
        type:String,
        required:[true,"Inventory Type is required"],
        enum:['in','out']
     },
     bloodGroup:{
        type:String,
        required:[true,"Blood Type is required"],
        enum:['O+','O-','A+','A-','B+','B-','AB+','AB-']
     },
     quantity:{
        type:Number,
        required:[true,"Quantity is required"]
     },
     email:{
         type:String,
         required:[true,"Doanr Email is required"]
     },
     organisation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:[true,"organisation is required"]
     },

     hospital:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required: function(){
            if(this.inventoryType==='out'){
                return true
            }
            return false;
        }
     },
     donar:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required: function(){
            if(this.inventoryType==='in'){
                return true
           }
           return false;
        }
     }
},{timestamps:true})


export const inventoryModel = mongoose.model('inventory',inventorySchema);
