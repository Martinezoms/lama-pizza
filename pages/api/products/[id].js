import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

// /api/product/[id]

async function handler(req, res) {
  const {
    method,
    body,
    query: { id },
    cookies
  } = req;

  const token = cookies.token;

  await dbConnect();

  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Not authenticated");
    }

    try {
      const product = await Product.findByIdAndUpdate(id, body, { new: true });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Not authenticated");
    }

    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json("Product deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default handler;
