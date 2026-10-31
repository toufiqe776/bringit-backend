
const pool = require("../config/db");

// GET ALL PRODUCTS
const getAllProducts = async () => {
  const result = await pool.query(
    "SELECT * FROM products ORDER BY id ASC"
  );

  return result.rows;
};

// GET PRODUCT BY ID
const getProductById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM products WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

// CREATE PRODUCT
const createProduct = async (product) => {
  const {
    name,
    category,
    description,
    image_url,
    price,
    stock,
  } = product;

  const result = await pool.query(
    `INSERT INTO products
      (name, category, description, image_url, price, stock)
     VALUES
      ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      name,
      category,
      description,
      image_url,
      price,
      stock,
    ]
  );

  return result.rows[0];
};

// UPDATE PRODUCT
const updateProduct = async (id, product) => {
  const {
    name,
    category,
    description,
    image_url,
    price,
    stock,
  } = product;

  const result = await pool.query(
    `UPDATE products
     SET
       name = $1,
       category = $2,
       description = $3,
       image_url = $4,
       price = $5,
       stock = $6
     WHERE id = $7
     RETURNING *`,
    [
      name,
      category,
      description,
      image_url,
      price,
      stock,
      id,
    ]
  );

  return result.rows[0];
};

// DELETE PRODUCT
const deleteProduct = async (id) => {
  const result = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
