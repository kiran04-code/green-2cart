
import express from "express"
import connectionwithDB  from "./config/db.js"
import dotenv from "dotenv"
import userroutes from "./routes/user.js"
import sellerRoute from "./routes/seller.js"
import productRoute from "./routes/products.js"
import Razorpay from "razorpay"
import { Server } from "socket.io"
const app = express()
import http from "http"
import cors from "cors"
dotenv.config()
const server = http.createServer(app)
import cookieParser from "cookie-parser"
import { checkAuth } from "./middleware/user.js"
import { checksellerAuth } from "./middleware/seller.js"
import  "./config/cloudnary.js"
import updateRoute from "./routes/cartUpdated.js"
import AddressRoutes from "./routes/AddresRoutes.js"
import orderRoutes from "./routes/Orders.js"
import paymentRoutes from "./routes/paymentRoutes.js"

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const allowedOrigins = [
  "http://localhost:5173",
  "https://greencart-kiran-dev.onrender.com"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
export const  instance = new Razorpay({
  key_id:process.env.RAZORPAY_API_KEY,
  key_secret:process.env.RAZORPAY_SECRET_KEY,
 })
app.use(cookieParser())
app.use(checkAuth("token_user_login"))
app.use(checksellerAuth("seller"))
connectionwithDB(process.env.MONGODB_URL).then(()=>{
  console.log("mongodb is Connected")
}).catch((err)=>{
    console.log("ERROR",err)
})

// iniallization of socket.io
const io = new Server(server,{
    cors:{
    origin:"https://greencart-kiran-dev.onrender.com",
     methods: ["GET", "POST"],
    credentials:true
    }
    
})
io.on("connection",(socket)=>{
     socket.on("disconnect", () => {
  });
   socket.on("sendmessage-to-seller",(data)=>{
        io.emit("recive-this-message-seller",data)
    })
   socket.on("reply-to-user",(data)=>{
        io.emit("recive-this-message-foruser",data)
    })

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
app.use("/api",paymentRoutes)
app.get("/api/getkey",(req,res)=>{
  res.status(200).json({
     key:process.env.RAZORPAY_API_KEY
    })
})
server.listen(port,(req,res)=>{
    console.log(`Server is running on port http://localhost:${port}`)
})