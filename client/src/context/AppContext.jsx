import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AppContext = createContext(null)
export const useAppContext = () => {
    return useContext(AppContext)
}
const AppContextProvider = ({ children }) => {

    const currancy = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
      const [seltectedAdress,setSelectedAdress] = useState([])
    const [shoUserLogin, setshoUserLogin] = useState(null)
    const [product, setProduct] = useState([])
    const [cartItems, setCartItems] = React.useState({});
    const [searchQuery, setsearchQuery] = useState("")
    const BakendURL = import.meta.env.VITE_SERVER_URL
    axios.defaults.baseURL = BakendURL


    // ALL Authentication WORKS FROM SELLAER TO USER 
    const handleLogin = async (state, body) => {
        try {
            const { data } = await axios.post(`/api/${state}`, body, { withCredentials: true })
            console.log(data)
            if (data.success) {
                setUser(data.userData)
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error("Something went Wrong")
        }
    }

    const handleGoogleLogin = async (body) => {
        try {
            const { data } = await axios.post("/api/GoogleLogin", body, { withCredentials: true })
            if (data.success) {
                setUser(data.data)
                toast.success(data.message)
            }
            else {
                toast.error("Something Went Wrong")
            }
        } catch (error) {
            toast.success(error)
        }

    }
    const loginAuth = async () => {
        try {
            const { data } = await axios.get("/api/isAuth", { withCredentials: true })
            if (data.success) {
                setUser(data.userData)
            }
            else {
                setUser(null)
            }
        } catch (error) {
            setUser(null)
        }

    }
    const logout = async () => {

        try {
            const { data } = await axios.get("/api/logout", { withCredentials: true })
            if (data.success) {
                setUser(null)
                toast.success(data.message)
            }
            else {
                toast.error("SomeThing Wrong with logout")
            }
        } catch (error) {
            toast.error(error)
        }
    }

    const sellerLogin = async (body) => {
        try {
            const { data } = await axios.post("/api/sellerlogin", body, { withCredentials: true })
            if (data.success) {
                setIsSeller(true)
                navigate("/seller")
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error)
        }
    }
    const sellerAuth = async () => {
        try {
            const { data } = await axios.get("/api/is-auth-seller", { withCredentials: true })
            if (data.success) {
                setIsSeller(true)
            } else {
                setIsSeller(false)
            }
        } catch (error) {
            setIsSeller(false)
        }
    }
    const sellerLogout = async () => {
        const { data } = await axios.get("/api/sellerLogout", { withCredentials: true })
        if (data.success) {
            setIsSeller(false)
            toast.success(data.message)
        }
        else {
            toast.success("Something Went Wrong with Logout")
        }
    }

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("/api/productList", { withCredentials: true })
            if (data.success) {
                setProduct(data.productsdata)
            }
        } catch (error) {
            console.log(error)
        }
    }


    // works on products
    const addTocart = (iteamId) => {
        let cartData = structuredClone(cartItems)
        if (cartData[iteamId]) {
            cartData[iteamId] += 1
        } else {
            cartData[iteamId] = 1
        }
        setCartItems(cartData)
        toast.success("Added to Card")
    }
    // ALL Aboute cartItems

    const updateCardItems = (itemId, quannity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId] = quannity
        setCartItems(cartData)
        toast.success(" Cart Updated")
    }
    // remove product from cart 

    const removeFromCrt = (iteamId) => {
        let cartData = structuredClone(cartItems)
        if (cartData[iteamId]) {
            cartData[iteamId] -= 1
            if (cartData[iteamId] === 0) {
                delete cartData[iteamId]
            }
        }
        setCartItems(cartData)
        toast.success("Remove from cart")
    }
    // cart item count 

    const getCartCount = () => {
        let totalCount = 0
        for (const item in cartItems) {
            totalCount += cartItems[item]
        }
        return totalCount
    }

    // Get Total Cart Ammount 
    const getCartTotalAmmount = () => {
        let TotalAmmount = 0;
        for (const items in cartItems) {
            let itemInfo = product.find((product) => product._id === items)
            if (cartItems[items] > 0) {
                TotalAmmount += itemInfo.offerPrice * cartItems[items]
            }
        }

        return Math.floor(TotalAmmount * 100) / 100
    }
    useEffect(() => {
        const cartData = async () => {
            try {
                const { data } = await axios.post("/api/updateCart", { cartItems }, { withCredentials: true })
                if (!data.success) {
                    toast.error(data.message)
                }

            } catch (error) {
                console.log(error)
                 toast.error(data.message)
            }
        }

        if(user){
            cartData()
        }
    }, [cartItems])
    useEffect(() => {
        fetchProducts()
        sellerAuth()
        loginAuth()
    }, [])
    const value = {
        user,
        setUser,
        isSeller,
        setIsSeller,
        shoUserLogin,
        setshoUserLogin,
        product,
        currancy,
        cartItems,
        logout,
        setCartItems,
        addTocart,
        updateCardItems,
        removeFromCrt,
        handleLogin,
        searchQuery,
        setsearchQuery,
        getCartCount,
        getCartTotalAmmount,
        sellerLogin,
        sellerLogout,
        handleGoogleLogin,
        fetchProducts,
        axios,
        

    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider
