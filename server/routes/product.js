const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const fetchuser = require("../middleware/fetchuser");

// ROUTE: 1; Get loggedin user details using GET "/api/v1/product/fetchallproduct". login required.
router.get("/fetchallproduct", async (req, res) => {
  try {
    const product = await Product.find(req.id);
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE: 2; Add a new product using POST "/api/v1/product/addrecipe". login required.
router.post("/addproduct", fetchuser, async (req, res) => {
  try {
    const { title, thumbnail, webpage, downloadlinks, category, tags } =
      req.body;
    const product = new Product({
      title,
      thumbnail,
      webpage,
      downloadlinks,
      category,
      tags,
      user: req.user.id,
    });
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE: 3; Update an existing product using PUT "/api/v1/product/updaterecipe". login required.
router.put("/updateproduct/:id", fetchuser, async (req, res) => {
  const { title, iframe, directions, ingredients, thumbnail, tags } = req.body;

  try {
    //Create a newProduct object
    const newProduct = {};
    if (title) {
      newProduct.title = title;
    }
    if (iframe) {
      newProduct.iframe = iframe;
    }
    if (directions) {
      newProduct.directions = directions;
    }
    if (ingredients) {
      newProduct.ingredients = ingredients;
    }
    if (thumbnail) {
      newProduct.thumbnail = thumbnail;
    }
    if (tags) {
      newProduct.tags = tags;
    }

    // Find the product to be updated and update it
    let product = await product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Page Not Found");
    }
    if (product.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    product = await product.findByIdAndUpdate(
      req.params.id,
      { $set: newProduct },
      { new: true }
    );
    res.json({ product });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE: 4; Delete an existing product using DELETE "/api/v1/product/deleterecipe". login required.
router.delete("/deleteproduct/:id", fetchuser, async (req, res) => {
  try {
    // Find the product to be delete and delete it
    let product = await product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Page Not Found");
    }

    // Allow deletion only if user owns this product
    if (product.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    product = await product.findByIdAndDelete(req.params.id);
    res.json({ Success: "product has been deleted", product: product });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE: 5; Get product by id using GET "/api/v1/product/fetchrecipe/:id".
router.get("/fetchproduct/:id", async (req, res) => {
  try {
    const product = await product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE: 6; Get product by tags using GET "/api/v1/product/fetchbytags".
router.get("/fetchbytags/:id", async (req, res) => {
  try {
    const product = await product.findById(req.params.id);
    const producttags = product.tags[0];
    const producttagsfind = await product.find({tags: { $elemMatch: { $in: producttags } }, _id: { $ne: req.params.id }});
    res.json(producttagsfind);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE: 7; Get product by tags for search using GET "/api/v1/product/search/:key".
router.get("/search/:key", async (req, res) => {
  try {
    const product = await product.find({tags: { $elemMatch: { $in: req.params.key } }});
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE: 8; Get product by date using GET "/api/v1/product/latest".
router.get("/latest", async (req, res) => {
  try {
    const product = await product.find(req.id).sort({_id: -1}).limit(8);
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
