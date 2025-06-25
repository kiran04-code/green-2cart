import express from "express";
import { addproduct, ProductById, productList,changeStock } from "../controller/product.js";
import { upload } from "../config/multer.js";
const productRoute = express.Router()
productRoute.post("/addproduct",upload.array("image"),addproduct)
productRoute.get("/productList",productList)
productRoute.get("/ProductById/id",ProductById)
productRoute.post("/changeStock",changeStock)


export default productRoute