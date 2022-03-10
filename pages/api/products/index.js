import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

//  /api/product

async function handler(req, res) {
  const { method, body } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      const product = await Product.create(body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default handler;
