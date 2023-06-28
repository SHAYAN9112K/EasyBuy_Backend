const orderModel = require("../../models/order")
const userModel = require("../../models/user")
const productModel = require("../../models/product")
const categoryModel = require("../../models/category")

module.exports.sellerDashboard = async (req, res) => {
    console.log('seller hitted')

    try{

        // counts 
        const ordersCount = await orderModel.find().count()
        // User.find({"publications": {$eq:req.params.id}}).exec()
        const usersCount = await userModel.find().count()
        const productsCount = await productModel.find({"sellerEmail": {$eq:req.params.sellerEmail}}).count()
        const categoriesCount = await categoryModel.find().count()

        return res.json({
            success : true,
            message : "dashboard data",
            data : {
                ordersCount,
                usersCount,
                productsCount,
                categoriesCount
            }
        })

    }catch(error){
        res.send(error.message)
    }

}

module.exports.getAllSellerProducts = async (req, res) => {
    try{

        // Search through title names
        var {search} = req.query
        if(!search) search = ""

        const products = await productModel.find({"sellerEmail": {$eq:req.params.sellerEmail}})
            .populate("category")

        return res.json({
            success : true,
            status : 200,
            message : "list of products",
            data : products
        })

    }catch(error){
        return res.json({
            success : false,
            status : 400,
            message : error.message
        })
    }
}

