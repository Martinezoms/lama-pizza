import { useState } from "react";
import Image from "next/image";
import classes from "../../styles/Admin.module.css";
import axios from "axios";

const Index = ({ orders, products }) => {
  const [productList, setProductList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setProductList(productList.filter((product) => product._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const response = await axios.put(`http://localhost:3000/api/orders/${id}`, { status: currentStatus + 1 });

      setOrderList([response.data, ...orderList.filter((order) => order._id !== id)]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={classes.container}>
      <div className={classes.item}>
        <h1 className={classes.title}>Products</h1>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          {productList.map((product) => (
            <tbody key={product._id}>
              <tr>
                <td>
                  <Image src={product.img} alt="" width={50} height={50} objectFit="cover" />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button className={classes.button}>Edit</button>
                  <button className={classes.button} onClick={() => handleDelete(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={classes.item}>
        <h1 className={classes.title}>Orders</h1>

        <table className={classes.table}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>{order.method === 0 ? <span>Cash</span> : <span>Paid</span>}</td>
                <td>{status[order.status]}</td>
                <td>
                  <button className={classes.button} onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </section>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false
      }
    };
  }
  const productResponse = await axios.get("http://localhost:3000/api/products");
  const orderResponse = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      products: productResponse.data,
      orders: orderResponse.data
    }
  };
};

export default Index;
