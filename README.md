# 🛒 GreenCart - Grocery Web Application

**GreenCart** is a modern full-stack grocery e-commerce application built using the **MERN stack** (MongoDB, Express.js, React, Node.js). It offers users a seamless grocery shopping experience with real-time chat and secure online payments.

---

## 🚀 Live Features

- 🛍️ Browse and search fresh grocery products  
- 👨‍💻 User registration and login  
- 🧺 Add to cart and place orders  
- 💬 Real-time chat between users and shopkeepers using **Socket.IO**  
- 💳 Online payments using **Stripe**  
- 📦 Order tracking for users and shopkeepers  
- 🛒 Shopkeeper dashboard to manage inventory and view orders  

---

## 💳 Online Payment with Razorpay

GreenCart integrates **Razorpay Checkout** to allow users to securely pay online.

### How it works:

1. Users add items to their cart and proceed to checkout.  
2. Razorpay Checkout redirects to a secure payment page.  
3. On success, a confirmation is shown and the order is saved.  
4. Razorpay manages all sensitive data securely.

---

## ⚙️ Installation & Setup (Without Docker)

### 🔧 Backend (Express + MongoDB)


    git clone https://github.com/kiran04-code/green-2cart.git

    cd server
    npm install
    npm start
🎨 Frontend (React + Vite)

    cd client
    npm install
    npm run dev


🐳 Docker + Docker Compose Setup
    🚀 Using Docker Compose

     git clone https://github.com/kiran04-code/green-2cart.git
   
      cd green-2cart
      docker-compose up --build

💡 To run in background:

        docker-compose up -d
 🛑 To stop the containers:

    docker-compose down

🐳 Run from Docker Hub (No Code Clone Needed)

GreenCart is available as pre-built Docker images:

Service	Docker Image Link

🖥️ Frontend  

      greencart-kiran.dev-frontend
 🗄️ Backend
 
      greencart-kiran.dev-backend
      
🔌 Run using Docker CLI

🕸️ First, create a Docker network:

     docker network create greencart-network

🚀 Run Frontend:

    docker run -it -p 5173:5173 --name=greencart-client --network=greencart-network 7774025744/greencart-kiran.dev-frontend

 Access in browser: http://localhost:5173

 🚀 Run Backend:

    docker run -it -p 6003:6003 --name=greencart-server --network=greencart-network 7774025744/greencart-kiran.dev-backend
 Access in browser: http://localhost:6003
 
🐳 © 2025 — @kiran.dev. All rights reserved.



