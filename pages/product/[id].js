import axios from "axios";
import classes from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Product = ({ pizza }) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const { title, img, prices, desc, extraOptions } = pizza;

  const changePrice = (num) => {
    setPrice(price + Number(num));
  };

  const handleSize = (sizeIndex) => {
    const diff = prices[sizeIndex] - prices[size];
    setSize(sizeIndex);
    changePrice(diff);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, extras, price, quantity }));
  };

  return (
    <section className={classes.container}>
      <div className={classes.left}>
        <div className={classes.imgContainer}>
          <Image src={img} alt="" layout="fill" objectFit="contain" priority />
        </div>
      </div>
      <div className={classes.right}>
        <h1 className={classes.title}>{title}</h1>
        <span className={classes.price}>${price}</span>
        <p className={classes.desc}>{desc}</p>
        <h3 className={classes.choose}>Choose your size</h3>
        <div className={classes.sizes}>
          <div className={classes.size} onClick={() => handleSize(0)}>
            <Image src="/images/size.png" alt="" layout="fill" />
            <span className={classes.number}>Small</span>
          </div>
          <div className={classes.size} onClick={() => handleSize(1)}>
            <Image src="/images/size.png" alt="" layout="fill" />
            <span className={classes.number}>Medium</span>
          </div>
          <div className={classes.size} onClick={() => handleSize(2)}>
            <Image src="/images/size.png" alt="" layout="fill" />
            <span className={classes.number}>Large</span>
          </div>
        </div>
        <h3 className={classes.choose}>Choose additional ingredients</h3>
        <div className={classes.ingredients}>
          {extraOptions.map((option) => (
            <div key={option._id} className={classes.option}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={classes.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor={option.text}>{option.text}</label>
            </div>
          ))}
        </div>
        <div className={classes.add}>
          <input
            type="number"
            defaultValue={1}
            className={classes.quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button className={classes.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps = async ({ params }) => {
  let url = process.env.DEV_URL;

  if (process.env.NODE_ENV === "production") {
    url = process.env.PROD_URL;
  }

  try {
    const response = await axios.get(`${url}/api/products/${params.id}`);
    console.log(response.data);

    return {
      props: {
        pizza: response.data
      }
    };
  } catch (err) {
    console.log(err);
  }
};

export default Product;
