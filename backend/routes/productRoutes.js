import express from 'express';
const router = express.Router();
import { getProducts, getProductById } from '../controllers/productController.js';


// 没有controller的写法

// router.get('/', asyncHandler(async (req, res) => {
//     const products = await Product.find({}); // get all products, pass an empty object to find
//     res.json(products);
// }));

// router.get('/:id', asyncHandler(async (req, res) => {
//     // 使用mongoose的findById方法从数据库中查找单个产品
//     const product = await Product.findById(req.params.id);
//     // 这行代码在一个已经存在的 products 数组中查找产品。products 是一个 JavaScript 数组，包含一组产品对象。
//     // const product = products.find((p) => p._id === req.params.id);
//     if (product) {
//         return res.json(product);
//     }

//     res.status(404).json({ message: 'Product not found' });
// }));


// 加上controller的写法
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);


export default router;