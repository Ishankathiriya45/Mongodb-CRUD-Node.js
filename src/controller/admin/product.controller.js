const db = require("../../models");
const { responseMsg } = require("../../response");

class ProductController {
    constructor() { }

    async createProduct(req) {
        try {
            const { name, category, price, stock } = req.body;

            const productData = {
                name: name,
                category: category,
                price: price,
                stock: stock,
                productImg: req.file.filename,
            }

            const detail = await db.ProductModel.create(productData)

            if (detail) {
                return responseMsg.successCode(1, "Success", detail)
            } else {
                return responseMsg.serverError(0, "No product")
            }
        } catch (error) {
            return responseMsg.serverError(0, "No product")
        }
    }

    async getProduct(req) {
        try {
            const limit = req.query.limit;
            const page = req.query.page;
            const offset = limit * (page - 1)

            const getDetail = await db.ProductModel.find().limit(limit).skip(offset)

            if (getDetail) {
                return responseMsg.successCode(1, "Success", getDetail)
            } else {
                return responseMsg.serverError(0, "No product")
            }
        } catch (error) {
            return responseMsg.serverError(0, "No product")
        }
    }

    async updateProduct(req) {
        try {
            const { productId } = req.params;
            const { name, category, price, stock } = req.body;

            const getDetail = await db.ProductModel.findOne({ _id: productId })

            if (!getDetail) {
                return responseMsg.serverError(0, "No product")
            }

            const updateData = {};
            let productImg = req.file.filename;
            name ? (updateData.name = name) : null;
            category ? (updateData.category = category) : null;
            price ? (updateData.price = price) : null;
            stock ? (updateData.stock = stock) : null;
            productImg ? (updateData.productImg = productImg) : null;

            const editDetail = await db.ProductModel.updateOne(
                { _id: productId },
                { $set: updateData },
            )

            if (editDetail) {
                return responseMsg.successCode(1, "product updated Successfully", editDetail)
            } else {
                return responseMsg.serverError(0, "Failed product updated")
            }
        } catch (error) {
            return responseMsg.serverError(0, "Something went wrong", error.message)
        }
    }

    async deleteProduct(req) {
        try {
            const { productId } = req.params;

            const getDetail = await db.ProductModel.findOne({ _id: productId })

            if (!getDetail) {
                return responseMsg.valiidationError(0, "No product")
            }

            const removeDetail = await db.ProductModel.deleteOne({ _id: productId })

            if (removeDetail) {
                return responseMsg.successCode(1, "Success", removeDetail)
            } else {
                return responseMsg.valiidationError(0, "Failed product deleted")
            }
        } catch (error) {
            return responseMsg.serverError(0, "Something went wrong", error.message)
        }
    }
}

module.exports = {
    ProductController
}