import { useState } from "react";
import classes from "../styles/CashPaymentModal.module.css";

const CashPaymentModal = ({ total, createOrder }) => {
  const [orderDetails, setOrderDetails] = useState({
    customer: "",
    address: ""
  });

  const handleOrder = () => {
    createOrder({ customer: orderDetails.customer, address: orderDetails.address, total, method: 0 });
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h1 className={classes.title}>you will pay $12 on delivery</h1>
        <div className={classes.item}>
          <label className={classes.label}>Name Surname</label>
          <input
            type="text"
            placeholder="John Doe"
            className={classes.input}
            onChange={(e) => setOrderDetails((prev) => ({ ...prev, customer: e.target.value }))}
          />
        </div>
        <div className={classes.item}>
          <label className={classes.label}>Phone Number</label>
          <input type="text" placeholder="+1 234 567 89" className={classes.input} />
        </div>
        <div className={classes.item}>
          <label className={classes.label}>Address</label>
          <textarea
            rows={5}
            type="text"
            placeholder="Elton St. 505 NY"
            className={classes.textarea}
            onChange={(e) => setOrderDetails((prev) => ({ ...prev, address: e.target.value }))}
          />
        </div>
        <button className={classes.button} onClick={handleOrder}>
          Order
        </button>
      </div>
    </div>
  );
};

export default CashPaymentModal;
