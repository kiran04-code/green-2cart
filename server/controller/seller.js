import seller from "../model/seller.js"
import { createTokenforSeller } from "../auth/sellerJwt.js"
export const sellerLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
    let findSeller = await seller.findOne({ email });

    if (findSeller) {
      const token = createTokenforSeller(findSeller);
      res.cookie("seller", token).json({
        success: true,
        message: "Successful! Login as Seller",
        sellartData: findSeller.toObject()
      });
    } else {
      const createSeller = await seller.create({ email, password });
      const token = createTokenforSeller(createSeller);
      res.cookie("seller", token).json({
        success: true,
        message: "Account created & logged in as Seller",
        sellartData: createSeller.toObject()
      });
    }
  } else {
    res.json({
      success: false,
      message: "Invalid credentials!"
    });
  }
};

export const isAuth = async(req,res)=>{
  try {
    const userid = req.seller
    const users = await seller.findById(userid).select("-password")
    if(users){
         return res.json({success:true,message:"seller found"})
    }
   return  res.json({success:false,message:"seller not found"})
  } catch (error) {
    console.log(error.message)
    return res.json({success:false,message:error.message})
  }
}
export const sellerLogout = async(req,res)=>{
 try {
   res.clearCookie("seller", {
    httpOnly: true,
    secure: process.NODE_ENV ==="production"   ,    // only enable in production or HTTPS
    sameSite: process.NODE_ENV ==="production" ?"none" :"strict"    // optional but adds CSRF protection
  });

  return res.json({
    success: true,
    message: "Logout successful!"
  });
 } catch (error) {
  console.log(error)
 }
}