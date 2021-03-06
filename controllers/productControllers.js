const asyncHandler =require('express-async-handler') ;
const Product =require('../models/Product') ;

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
module.exports.getProducts =asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(200).send(products);
    
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
module.exports.getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product Not Found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
module.exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product Not Found');
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
module.exports.createProduct = asyncHandler(async (req, res) => {
    const product = await new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
module.exports.updateProduct = asyncHandler(async (req, res) => {
    const { name, price, image, brand, category, countInStock, description } =
        req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        product.description = description;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
module.exports.createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        } else {
            const review = {
                name: req.user.name,
                user: req.user._id,
                rating: Number(rating),
                comment,
            };

            product.reviews.push(review);
            product.numReviews = product.reviews.length;

            product.rating =
                product.reviews.reduce((acc, r) => acc + r.rating, 0) /
                product.reviews.length;

            await product.save();
            res.status(201).json({ message: 'Review added' });
        }
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});
