import user from "../model/user.js"

// updated the cart data 
 export const updateCart = async(req,res)=>{
 try {
    const {cartItems}  = req.body 
   const   userId = req.user
   const result = await user.findByIdAndUpdate(
  userId,
  { cartItems },
  { new: true }
);
    res.json({success:true,message:"Cart Updated",result})
 } catch (error) {
    console.log(error.message)
    res.json({
        success:true,
        message:error.message
    })
 }
 }