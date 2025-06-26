🛒 GreenCart - Grocery Web Application

GreenCart is a modern full-stack grocery e-commerce application built using the MERN stack (MongoDB, Express.js, React, Node.js). It offers users a seamless grocery shopping experience with real-time chat and secure online payments.
🚀 Live Features

    🛍️ Browse and search fresh grocery products

    👨‍💻 User registration and login

    🧺 Add to cart and place orders

    💬 Real-time chat between users and shopkeepers using Socket.IO

    💳 Online payments using Stripe

    📦 Order tracking for users and shopkeepers

    🛒 Shopkeeper dashboard to manage inventory and view orders

💳 Online Payment with Stripe

GreenCart integrates Stripe Checkout to allow users to securely pay for their groceries online. Payment is processed in real-time, and the order is recorded only after successful payment confirmation.
⚙️ How It Works

    Users add items to their cart and proceed to checkout.

    Stripe Checkout is triggered, and the user is redirected to a secure Stripe-hosted page.

    On success, a confirmation is shown and the order is saved in the database.

    Payment details and status are securely managed via Stripe.



 Installation and Setup in your machine  without docker 

  Clone the repository

    git clone https://github.com/YOUR_USERNAME/greenCart.git

  Start Server (Setup Backend )

     cd server
     npm install
     npm start 

  Start Clinet ( Setup Frontend (React + )
  
     cd client 
     npm install 
     npm run dev 
     


