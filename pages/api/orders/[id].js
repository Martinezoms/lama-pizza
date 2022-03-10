import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

// /api/orders/[id]

const handler = async (req, res) => {
  const {
    method,
    body,
    query: { id }
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    try {
      const order = await Order.findByIdAndUpdate(id, body, { new: true });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DElETE") {
  }
};

export default handler;
