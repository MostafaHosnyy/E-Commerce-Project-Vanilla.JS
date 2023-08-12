const ProductModel = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json({ data: products, status: "success" }
    );
  } catch (err)
  {
    res.status(500).json({ error: err.message }
      );
  }
};


exports.getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.json({ data: product, status: "success" }
    );
  } catch (err) 
  {
    res.status(500).json({ error: err.message }
      );
  }
};



