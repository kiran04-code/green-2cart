import express from "express"
import { updateCart } from "../controller/CartUpdate.js"
 const updateRoute = express.Router()
 updateRoute.post("/updateCart",updateCart)
 export default updateRoute