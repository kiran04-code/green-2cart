import Address from "../model/adress.js"

// Add ADDRESS --path - /api/address/add
export const Addaddress = async (req, res) => {
    try {
        const { adress } = req.body
        const userId = req.user
        const Adress = await Address.create({
            ...adress, userId
        })
        return res.json({
            success: true, message: "Address add!",
        })
    } catch (error) {
        console.log(error.message)
        return res.json({
            sucess: false,
            message: error.message
        })
    }
}

// Get -Address :/address/get

export const getAddress = async (req, res) => {
    try {
        const userId = req.user
        const getAdd = await Address.find( {userId} )
        return res.json({
            success: true,
            address:getAdd
        })
       
    } catch (error) {
        console.log(error.message)
       return res.json({
            success: false,
            message: error.message
        })
    }
}