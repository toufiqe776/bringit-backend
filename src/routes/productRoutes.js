
const express = require("express");

const router = express.Router();

const productController = require(
  "../controllers/productController"
);

const upload = require(
  "../middleware/uploadMiddleware"
);

// Upload product image
router.post(
  "/upload-image",
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

    const imagePath =
      `/uploads/products/${req.file.filename}`;

    const imageUrl =
      `${req.protocol}://${req.get("host")}${imagePath}`;

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image_url: imageUrl,
    });
  }
);

// Existing product routes
router.get("/", productController.getProducts);

router.get("/:id", productController.getProduct);

router.post("/", productController.createProduct);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
