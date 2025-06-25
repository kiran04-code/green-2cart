import express from "express"
import {handleLoginWithGoogle, handleLogin, hnadleUserSignup,logout,authcheck, isAuth} from "../controller/user.js"
const userroutes = express.Router()
userroutes.post("/Singup",hnadleUserSignup)
userroutes.post("/Signin",handleLogin)
userroutes.get("/isAuth",isAuth)
userroutes.post("/GoogleLogin",handleLoginWithGoogle)
userroutes.get("/logout",logout)
userroutes.get("/authcheck",authcheck)
export default userroutes