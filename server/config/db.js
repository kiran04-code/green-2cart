import  mongoose from "mongoose"

 const connectionwithDB  = async(url)=>{
    await mongoose.connect(url)
}
export default connectionwithDB

