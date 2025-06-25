import  cloudinary from "../config/cloudnary.js"
import Product from "../model/product.js"
// add all products /products
export const addproduct = async (req, res) => {
  try {
    if (!req.body.productData) {
      return res.status(400).json({ success: false, message: "Missing productData" });
    }

    const parsedData = JSON.parse(req.body.productData);
    const imageFiles = req.files;
    const imageUrls = await Promise.all(
      imageFiles.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const newProduct = {
      ...parsedData,
      description: parsedData.description.split("\n"),
      image: imageUrls,
    };

    await Product.create(newProduct);
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//  get product list /product/list
export const productList = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({ success: true, productsdata:products })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}
// get prodyuct By Id  product/id
export const ProductById = async (req, res) => {
    try {
        const { id } = req.body
        const product = await Product.findById({ id })
        res.json({
            success: true, product
        })
    } catch (error) {
        console.log(error.message)
        res.json({
            success: false
        })
    }
}
// change the stock --- / product/stock
export const changeStock = async (req, res) => {
    try {
        const { id,  inStock } = req.body
         await Product.findByIdAndUpdate(id, { inStock })
        res.json({ success: true,message:"Stock Updated"})
    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}