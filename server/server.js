
import  express from "express"
import  connectionwithDB  from "./config/db.js"
import dotenv from "dotenv"
import userroutes from "./routes/user.js"
import sellerRoute from "./routes/seller.js"
import productRoute from "./routes/products.js"
import cors from "cors"
dotenv.config()
const app = express()
import cookieParser from "cookie-parser"
import { checkAuth } from "./middleware/user.js"
import { checksellerAuth } from "./middleware/seller.js"
import  "./config/cloudnary.js"
import updateRoute from "./routes/cartUpdated.js"
import AddressRoutes from "./routes/AddresRoutes.js"
import orderRoutes from "./routes/Orders.js"
const allOrigies = ["http://localhost:5173/"]
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"https://fronted-2-5lr4.onrender.com/",
    credentials:true
}))
app.use(cookieParser())
app.use(checkAuth("token_user_login"))
app.use(checksellerAuth("seller"))
connectionwithDB(process.env.MONGODB_URL).then(()=>{
  console.log("mongodb is Connected")
}).catch((err)=>{
    console.log("ERROR",err)
})

const port =  process.env.PORT  || 6002
app.get("/api/status",(req,res)=>{
    res.send("Server is Working! with 200  Status Code")
})
app.get("/checkuser",(req,res)=>{
    res.json({
        user:req.user
    })
})
app.get("/checkseller",(req,res)=>{
    res.json({
        seller:req.seller
    })
})
app.use("/api",userroutes,)
app.use("/api",sellerRoute)
app.use("/api",productRoute)
app.use("/api",updateRoute)
app.use("/api",AddressRoutes)
app.use("/api",orderRoutes)
app.listen(port,(req,res)=>{
    console.log(`Server is running on port http://localhost:${port}`)
})