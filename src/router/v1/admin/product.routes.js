const express = require('express');
const { AdminModule } = require('../../../controller');
const upload = require('../../../service/image.service');
const { productAuth } = require('../../../middleware');
const { joyValidate } = require('../../../middleware/joiValidate.service');
const { ProductValidate } = require('../../../validation/product.validate');
const router = express()

const ProductCtr1 = new AdminModule.productCtr1.ProductController()

router.post('/create',
    upload.single('productImg'),
    productAuth,
    joyValidate(ProductValidate.createProduct),
    async (req, res) => {
        const result = await ProductCtr1.createProduct(req, res)
        return res.status(result.status).send(result)
    }
)

router.get('/list',
    productAuth,
    async (req, res) => {
        const result = await ProductCtr1.getProduct(req, res)
        return res.status(result.status).send(result)
    }
)

router.patch('/update/:productId',
    upload.single('productImg'),
    productAuth,
    async (req, res) => {
        const result = await ProductCtr1.updateProduct(req, res)
        return res.status(result.status).send(result)
    }
)

router.delete('/remove/:productId',
    productAuth,
    async (req, res) => {
        const result = await ProductCtr1.deleteProduct(req, res)
        return res.status(result.status).send(result)
    }
)

module.exports = router;