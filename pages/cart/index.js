import classes from "../../styles/Cart.module.css";
import Image from "next/image";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import { reset } from "../../redux/cartSlice";
import CashPaymentModal from "../../components/CashPaymentModal";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [cashPayment, setCashPayment] = useState(false);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  // This values are the props in the UI
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };

  // sending request to APi
  const createOrder = async (data) => {
    try {
      const response = await axios.post("/api/orders", data);

      if (response.status === 201) {
        dispatch(reset());
        router.push(`/orders/${response.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount
                    }
                  }
                ]
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              // Your code here after capture the order
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <table className={classes.table}>
          <thead>
            <tr className={classes.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((product) => (
              <tr className={classes.tr} key={product._id}>
                <td>
                  <div className={classes.imgContainer}>
                    <Image src={product.img} layout="fill" alt="" objectFit="cover" />
                  </div>
                </td>
                <td>
                  <span className={classes.name}>{product.title}</span>
                </td>
                <td>
                  <span className={classes.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text},</span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={classes.price}>${product.price}</span>
                </td>
                <td>
                  <span className={classes.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={classes.total}>${product.price * product.quantity}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={classes.right}>
        <div className={classes.wrapper}>
          <h2 className={classes.title}>CART TOTAL</h2>
          <div className={classes.totalText}>
            <b className={classes.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={classes.totalText}>
            <b className={classes.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={classes.totalText}>
            <b className={classes.totalTextTitle}>Total:</b>${cart.total}
          </div>
          {open ? (
            <div className={classes.paymentMethods}>
              <button className={classes.payBtn} onClick={() => setCashPayment(true)}>
                CASH ON DELIVERY
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id": "ASreLXupymrsEoenH3bCU1sArTXhEcoETf6yeWMD6OIzT2X3jQc6WUkrHe8McLC4Z2h6JLKHw5frWgLA",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24"
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button className={classes.button} onClick={() => setOpen(true)}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {cashPayment && <CashPaymentModal total={cart.total} createOrder={createOrder} />}
    </div>
  );
};

export default Cart;
