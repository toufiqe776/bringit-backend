
const Product = require("../models/productModel");

const validId = (id) =>
  Number.isSafeInteger(Number(id)) && Number(id) > 0;

const validateProduct = (body) => {
  if (!body || typeof body !== "object") return false;

  const {
    name,
    category,
    description,
    image_url,
    price,
    stock,
  } = body;

  return (
    typeof name === "string" &&
    name.trim().length > 0 &&
    name.length <= 150 &&

    typeof category === "string" &&
    category.trim().length > 0 &&
    category.length <= 100 &&

    typeof description === "string" &&
    description.trim().length > 0 &&
    description.length <= 5000 &&

    typeof image_url === "string" &&
    image_url.trim().length > 0 &&
    image_url.length <= 2048 &&
    (() => {
      try {
        const url = new URL(image_url);
        return ["http:", "https:"].includes(url.protocol);
      } catch {
        return false;
      }
    })() &&

    price !== null &&
    price !== undefined &&
    price !== "" &&
    Number.isFinite(Number(price)) &&
    Number(price) >= 0 &&
    Number(price) <= 99999999.99 &&

    stock !== null &&
    stock !== undefined &&
    stock !== "" &&
    Number.isSafeInteger(Number(stock)) &&
    Number(stock) >= 0 &&
    Number(stock) <= 2147483647
  );
};

const normalizeProduct = (body) => ({
  name: body.name.trim(),
  category: body.category.trim(),
  description: body.description.trim(),
  image_url: body.image_url.trim(),
  price: Number(body.price),
  stock: Number(body.stock),
});

// GET /api/products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.getAllProducts();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:id
exports.getProduct = async (req, res, next) => {
  try {
    if (!validId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.getProductById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/products
exports.createProduct = async (req, res, next) => {
  try {
    if (!validateProduct(req.body)) {
      return res.status(400).json({
        success: false,
        message:
          "Name, category, description, image URL, valid price and stock are required",
      });
    }

    const product = await Product.createProduct(
      normalizeProduct(req.body)
    );

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/products/:id
exports.updateProduct = async (req, res, next) => {
  try {
    if (!validId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    if (!validateProduct(req.body)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product data",
      });
    }

    const product = await Product.updateProduct(
      req.params.id,
      normalizeProduct(req.body)
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/products/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    if (!validId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.deleteProduct(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
