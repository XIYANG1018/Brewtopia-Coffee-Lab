import asyncHandler from '../middleware/asyncHandler.js'
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});


// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    console.log(req.body);
    const product = new Product({
        user: req.user._id,
        name: 'Sample name',
        price: 0,
        image: '/images/sample.jpg',
        hoverImage: '/images/sample.jpg',
        color: 'Sample color',
        textColor: 'Sample textColor',
        category: 'Sample category',
        rating: 0,
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
        sizes: {
            '4oz': 10,
            '10oz': 30,
            '2lbs': 60,
            '5lbs': 80
        },
    }); 

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});


// @desc Update a product
// @route POST /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, image, hoverImage, color, textColor, category, rating, countInStock,
        numReviews, description, sizes
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.image = image;
        // product.hoverImage = hoverImage;
        product.color = color;
        product.textColor = textColor;
        product.category = category;
        product.countInStock = countInStock
        product.description = description
        
        const updatedProduct = await product.save();
        res.json(updatedProduct);
        
        
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }


});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({_id: product._id});
        res.status(200).json({message: 'Product removed'});
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});





export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };

