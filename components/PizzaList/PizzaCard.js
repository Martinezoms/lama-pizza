import Image from "next/image";
import Link from "next/link";
import classes from "../../styles/PizzaCard.module.css";

export const PizzaCard = ({ title, desc, img, prices, _id }) => {
  return (
    <Link href={`/product/${_id}`} passHref>
      <div className={classes.container}>
        <Image src={img} alt="" width="500" height="500" />
        <h1 className={classes.title}>{title}</h1>
        <span className={classes.price}>${prices[0]}</span>
        <p className={classes.desc}>{desc}</p>
      </div>
    </Link>
  );
};
