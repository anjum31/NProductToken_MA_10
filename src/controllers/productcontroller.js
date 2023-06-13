const jwt = require("jsonwebtoken");
const productModel = require("../models/product.schema");

exports.allProduct = async (req, res) => {
  try {
    const productData = await productModel.find(
      {},
      { _id: 0, name: 1, price: 1 }
    );
    res.status(200).json({ message: productData });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.generateToken = (req, res) => {
  const secretkey = "##123456";
  const userId = 432109;
  const token = jwt.sign(userId, secretkey, { expiresIn: "1h" });
  res.json({token});
};

exports.authenticate = (req, res, next) => {
  const bToken = req.headers["authorization"];
  const bearerToken = bToken.split(" ");
  const token = bearerToken[1];
  jwt.verify(token, secretkey, (err, decoded) => {
    if (err) {
      res.status(401).json({ status: "Unauthorized error.", data: err });
    } else {
      res.status(200).json({ status: "valid Token", data: decoded });
      next();
    }
  });
};
