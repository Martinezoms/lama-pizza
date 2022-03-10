import { useState, useEffect } from "react";
import Image from "next/image";
import classes from "../../styles/Featured.module.css";

const Featured = () => {
  const [index, setIndex] = useState(0);

  const images = ["/images/featured.png", "/images/featured2.png", "/images/featured3.png"];

  const handleArrowEvent = (direction) => {
    if (direction === "l") {
      return setIndex(index !== 0 ? index - 1 : images.length - 1);
    }
    if (direction === "r") {
      return setIndex(index !== images.length - 1 ? index + 1 : 0);
    }
  };

  return (
    <section className={classes.container}>
      <div className={classes.arrowContainer} style={{ left: 0 }} onClick={() => handleArrowEvent("l")}>
        <Image src="/images/arrowl.png" alt="" layout="fill" objectFit="contain" />
      </div>
      <div className={classes.wrapper} style={{ transform: `translateX(${-100 * index}vw)` }}>
        {images.map((img, i) => {
          return (
            <div key={i} className={classes.imgContainer}>
              <Image src={img} alt="" layout="fill" objectFit="contain" />
            </div>
          );
        })}
      </div>
      <div className={classes.arrowContainer} style={{ right: 0 }} onClick={() => handleArrowEvent("r")}>
        <Image src="/images/arrowr.png" alt="" layout="fill" objectFit="contain" />
      </div>
    </section>
  );
};

export default Featured;
