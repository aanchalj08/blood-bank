import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
     role:{
        type:String,
        required:[true,"Role is required"],
        enum:['admin','hospital','donar','organisation']
     },
     name:{
        type:String,
        required: function(){
            if(this.role==='donar' || this.role==='admin'){
                return true
            }
            return false;
        }
     },
     organisationName:{
        type:String,
        required: function(){
            if(this.role==='organisation'){
                return true
            }
            return false;
        }
     },
     hospitalName:{
        type:String,
        required: function(){
            if(this.role==='hospital'){
                return true
            }
            return false;
        }
     },
     email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
     },
     password:{
        type:String,
        required:[true,"Password is required"],
     },
     website:{
        type:String,
     },
     address:{
        type:String,
        required:[true,"Address is required"],
     },
     phone:{
        type:String,
        required:[true,"Contact Detail is required"],
     },

})


export const userModel = mongoose.model('users',userSchema);
