import mongoose from "mongoose"

const userShema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
    email:{
        require:true,
        type:String,

    },
    password:{
        type:String,
        require:true
    },
   cartItems: {
  type: Map,
  of: Number, // or of: Object if you want more info per item
  default: {}
}


})

const user =  mongoose.models.user ||mongoose.model("user",userShema)

export default user