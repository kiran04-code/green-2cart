import user from "../model/user.js";
import bcrypt from "bcrypt";
import { createToken } from "../auth/jwt.js";
export const hnadleUserSignup = async (req, res) => {
    const { firstName, email, password, } = req.body

    if(!email|| !password || !firstName){
         return res.json({
            success:false,
            message:"missing Details"
        })
    }
    const findUser = await user.findOne({ email })
    if (findUser) {
     return   res.json(({
            message: "user Already Exist",
            success: false
        }))

    }
    else {
        const haspassword = await bcrypt.hash(password, 10)
        const createdUser = await user.create({
            email,
            password: haspassword,
            firstName
        })

        const token = createToken(createdUser)
      return res.cookie("token_user_login", token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production", // user secure when it production,
        sameSite:process.env.NODE_ENV==="production"?"none":"strict", //CSRF PRODUCTION,
        maxAage:7*24*60*60*1000

      }).json({
            success: true,
            message: "Account successfully created!",
            userData: createdUser
        })
    }
}
export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
      if(!email || !password){
         return res.json({
            success:false,
            message:"missing Details"
        })
    }
    // Find user by email
    const finduser = await user.findOne({ email });

    // If user not found
    if (!finduser) {
      return res.json({
        message: "User does not exist. Please create a new account!",
        success: false
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, finduser.password);
    if (!isMatch) {
      return res.json({
        message: "Invalid credentials. Please try again!",
        success: false
      });
    }

    // Create token
    const token = createToken(finduser);

    // Send token in cookie
    return res.cookie("token_user_login", token, {
      httpOnly: true,
    }).json({
      success: true,
      message: "Login successful!",
      userData:req.body.user
    });

  } catch (error) {
    console.error("Login error:", error);
   return res.status(500).json({
      success: false,
      message: "Server error during login"
    });
  }
};

export const handleLoginWithGoogle = async (req, res) => {
    const { email, firstName } = req.body;

    try {
        const existingUser = await user.findOne({ email });

        if (existingUser) {
            const token = createToken(existingUser);
            return res
                .cookie("token_user_login", token, { httpOnly: true, secure: true })
                .json({
                    message: "Login successful!",
                    success: true,
                    userData: existingUser
                });
        } else {
            const randomPassword = Math.floor(100000 + Math.random() * 900000).toString();
            const hashedPassword = await bcrypt.hash(randomPassword, 10);

            const newUser = await user.create({
                email,
                firstName,
                password: hashedPassword
            });

            const token = createToken(newUser);
            return res
                .cookie("token_user_login", token, { httpOnly: true, secure: true })
                .json({
                    message: "Account created and login successful!",
                    success: true,
                    userData: newUser
                });
        }
    } catch (error) {
        console.error("Google login error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
export const isAuth = async(req,res)=>{
  try {
    const userid = req.user
    const users = await user.findById(userid).select("-password")
    res.json({success:true,userData:users})
  } catch (error) {
    console.log(error.message)
    res.json({success:false,message:error.message})
  }
}
export const authcheck = async ()=>{
 try {
   if(req.user){
    const findUser = await user.findById(req.user)
    res.json({
      success:true,
      message:"user is Authorized "
    })
  }
 } catch (error) {
  console.log(error)
 }
}
export const logout = async (req, res) => {
 try {
   res.clearCookie("token_user_login", {
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
};
