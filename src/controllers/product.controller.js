const Product = require("../models/Product");

const productController = {};
productController.getProducts = async (req, res) => {
  const { id } = req.params;
  const products = await Product.find({ storeId: id }).exec();
  res.json({
    statusCode: 200,
    data: products,
  });
};

productController.createProduct = async (req, res) => {
  const { id } = req.params;
  let message = "Product saved successfuly";
  let statusCode = 200;
  try {
    const { productName, quantity, price } = req.body;
    const newProduct = new Product({
      productName,
      quantity,
      price,
      storeId: id,
    });
    await newProduct.save();
  } catch (error) {
    statusCode = 400;
    message = "Fail to save product";
  }
  res.json({
    statusCode,
    message,
  });
};

productController.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.json({
    statusCode: 200,
    data: product,
  });
};
productController.updateProduct = async (req, res) => {
  const { productName, quantity, price } = req.body;

  await Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      productName,
      quantity,
      price,
    }
  );
  res.json({
    statusCode: 200,
    message: "updated successfuly",
  });
};
productController.deleteProduct = async (req, res) => {
  await Product.findOneAndDelete(req.params.id);
  res.json({
    statusCode: 200,
    message: "Product has been deleted",
  });
};

module.exports = productController;
