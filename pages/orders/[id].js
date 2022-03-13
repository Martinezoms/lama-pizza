import Image from "next/image";
import classes from "../../styles/Orders.module.css";
import axios from "axios";

const Order = ({ order }) => {
  const { _id, customer, address, status, total } = order;
  const orderStatus = status;

  const statusClass = (index) => {
    if (index - orderStatus < 1) return classes.done;
    if (index - orderStatus === 1) return classes.inProgress;
    if (index - orderStatus > 1) return classes.undone;
  };
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.row}>
          <table className={classes.table}>
            <thead>
              <tr className={classes.trTitle}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className={classes.tr}>
                <td>
                  <span className={classes.id}>{_id}</span>
                </td>
                <td>
                  <span className={classes.name}>{customer}</span>
                </td>
                <td>
                  <span className={classes.address}>{address}</span>
                </td>
                <td>
                  <span className={classes.total}>${total}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={classes.row}>
          <div className={statusClass(0)}>
            <Image src="/images/paid.png" width={30} height={30} alt="" />
            <span>Payment</span>
            <div className={classes.checkedIcon}>
              <Image className={classes.checkedIcon} src="/images/checked.png" width={20} height={20} alt="" />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src="/images/bake.png" width={30} height={30} alt="" />
            <span>Preparing</span>
            <div className={classes.checkedIcon}>
              <Image className={classes.checkedIcon} src="/images/checked.png" width={20} height={20} alt="" />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/images/bike.png" width={30} height={30} alt="" />
            <span>On the way</span>
            <div className={classes.checkedIcon}>
              <Image className={classes.checkedIcon} src="/images/checked.png" width={20} height={20} alt="" />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src="/images/delivered.png" width={30} height={30} alt="" />
            <span>Delivered</span>
            <div className={classes.checkedIcon}>
              <Image className={classes.checkedIcon} src="/images/checked.png" width={20} height={20} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.right}>
        <div className={classes.wrapper}>
          <h2 className={classes.title}>CART TOTAL</h2>
          <div className={classes.totalText}>
            <b className={classes.totalTextTitle}>Subtotal:</b>$7{total}
          </div>
          <div className={classes.totalText}>
            <b className={classes.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={classes.totalText}>
            <b className={classes.totalTextTitle}>Total:</b>${total}
          </div>
          <button disabled className={classes.button}>
            PAID
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  let url = process.env.DEV_URL;

  if (process.env.NODE_ENV === "production") {
    url = process.env.PROD_URL;
  }

  const response = await axios.get(`${url}/api/orders/${params.id}`);
  return {
    props: {
      order: response.data
    }
  };
};

export default Order;
