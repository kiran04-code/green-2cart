import express from "express"
import { allorderData, getorderofuser, placeOrdersCOD } from "../controller/orderControllere.js"
 const orderRoutes = express.Router()
orderRoutes.post("/placeorders",placeOrdersCOD)
orderRoutes.get("/getorder/user",getorderofuser)
orderRoutes.get("/getorder/admin/seller",allorderData)

 export default orderRoutes