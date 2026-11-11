import Product from '../models/Product.js';

// @desc Get all products
// @route GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single product by ID
// @route GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
