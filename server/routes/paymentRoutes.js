import express from "express";
import { handleonlinepayment, paymentsuccess } from "../controller/onlinepaymentcontroller.js";

const paymentRoutes = express.Router()

paymentRoutes.post("/paymentonline",handleonlinepayment)
paymentRoutes.post("/payment-success",paymentsuccess)

export  default paymentRoutes