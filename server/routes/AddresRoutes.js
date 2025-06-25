import express from "express"
import { Addaddress, getAddress } from "../controller/Adress.js"
const AddressRoutes = express.Router()

AddressRoutes.post("/Address/add",Addaddress)
AddressRoutes.get("/Address/get",getAddress)

export default AddressRoutes