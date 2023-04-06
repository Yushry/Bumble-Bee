import Product from '../models/productModel.js';

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, category, brand, price, inventory } = req.body;
    const product = new Product({
      name,
      category,
      brand,
      price,
      inventory
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Could not create product' });
  }
};



// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch products' });
  }
};



// Get a product by ID
export const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch product' });
  }
};



// Update a product
export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findByIdAndUpdate(productId, updates, {
      new: true
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Could not update product' });
  }
};



// Delete a product
export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Could not delete product' });
  }
};