import mongoose from "mongoose"

const sellerShema = new mongoose.Schema({
    email:{
        require:true,
        type:String,

    },
    password:{
        type:String,
        require:true
    },

})

const seller =  mongoose.models.seller || mongoose.model("seller",sellerShema)

export default seller