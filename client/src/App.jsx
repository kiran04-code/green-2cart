import {BrowserRouter,Routes ,Route,  useLocation} from "react-router-dom"
import './App.css'
import Homepage from "./pages/Homepage"
import Navbar from "./components/navbar"
import {Toaster} from "react-hot-toast"
import Fotter from "./components/Fotter"
import { useAppContext } from "./context/AppContext"
import Login from "./components/Login"
import Allproduct from "./pages/Allproduct"
import Categoriespage from "./pages/categoriespage"
import ProductDeatils from "./pages/ProductDeatils"
import Cart from "./pages/cart"
import Adress from "./pages/Adress"
import Myorders from "./pages/Myorders"
import Sellerlogin from "./components/seller/sellerlogin"
import SellerLayouts from "./pages/SellerLayout"
import Addproduct from "./components/seller/addproduct"
import ProductList from "./components/seller/ProductList"
import Orderss from "./components/seller/Orders"
import ChatContainers from "./pages/Chatcontaoner"
import DashboardChat from "./components/seller/Chatlayout"
function App() {

  const isSellerpath = useLocation().pathname.includes("seller")
  const {shoUserLogin,setshoUserLogin,isSeller,user} = useAppContext()
  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
<Toaster
  position="top-center"
  toastOptions={{
   
    // Success style (green)
    success: {
      style: {
        backgroundColor: '#4FBF8B', // your custom green
        color:"white"
      },
    },

    // Error style (red)
    error: {
      style: {
        backgroundColor: '#EF4444', // tailwind red-500 or custom red
      },
    },
  }}
/>

    { isSellerpath ? null : <Navbar/> }
    {shoUserLogin && <Login setshoUserLogin={setshoUserLogin}/>}
   <div className={` ${isSellerpath ? "":"px-6 md:px-16 lg:px-24 xl:px-32 py-7"}`}>
     <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/products" element={<Allproduct/>}/>
      <Route path="/products/:category" element={<Categoriespage/>}/>
      <Route path="/products/:category/:id" element={<ProductDeatils/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/Add-Adress" element={<Adress/>}/>
      <Route path="/My-orders" element={<Myorders/>}/>
      <Route path="/chat" element={  <ChatContainers/>}/>
    <Route path="/seller" element={isSeller ? <SellerLayouts/> :<Sellerlogin/>}>
     <Route index element={isSeller ? <Addproduct/> :null}/>
    <Route path="Product-list" element={<ProductList/>}/>
    <Route path="orders" element={<Orderss/>}/>
    <Route path="chats" element={<DashboardChat/>}/>
    </Route>
    </Routes>
   
   </div>
    {
      !isSellerpath &&<Fotter/>
    }
   </div>
   
  

  )
}

export default App
