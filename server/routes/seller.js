import express from "express"
import { sellerLogin,sellerLogout,isAuth } from "../controller/seller.js"
const sellerRoute = express.Router()
sellerRoute.post("/sellerlogin",sellerLogin)
sellerRoute.get("/is-auth-seller",isAuth)
sellerRoute.get("/sellerLogout",sellerLogout)

export default sellerRoute