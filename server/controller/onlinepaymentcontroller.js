import { instance } from "../server.js";
import crypto from "crypto"
import Order from "../model/ordersmode.js";
import Product from "../model/product.js";
export const handleonlinepayment = async (req, res) => {
  const {amount} = req.body
  try {
    const options = {
      amount: Number(amount*100), // amount in paise = INR 500
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
    });
  }
};



export const paymentsuccess = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(body.toString())
    .digest("hex");
  if (expectedSignature === razorpay_signature) {
    const {items,address,userId} = req.body
    if(!address || items.length===0){
        return res.json({
            success:false,
            message:"missing Details"
        })
    }

    let amount = 0;
for (const item of items) {
  const product = await Product.findById(item.product);
  if (product) {
    amount += product.offerPrice * item.quantity;
  }
}
// Add 2% additional charge
amount += Math.floor(amount * 2 / 100);

const ordrs  = await Order.create({
  userId,
  items,
  address,
  amount,
  paymentType: "Online"
});

return res.json({
  success:true,
   message: "Payment Successfull!",

})

  } else {
    res.status(400).json({
      success: false,
      message: "Invalid signature, payment verification failed",
    });
  }
};