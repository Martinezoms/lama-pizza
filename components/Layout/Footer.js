import Image from "next/image";
import classes from "../../styles/Footer.module.css";

const Footer = () => {
  return (
    <section className={classes.container}>
      <div className={classes.item}>
        <Image src="/images/bg.png" alt="" layout="fill" objectFit="cover" />
      </div>
      <div className={classes.item}>
        <div className={classes.card}>
          <h2 className={classes.motto}>OH YES, WE DID.THE LAMA PIZZA, WELL BAKED SLICE OF PIZZA.</h2>
        </div>
        <div className={classes.card}>
          <h1 className={classes.title}>FIND OUR RESTAURANTS</h1>
          <p className={classes.text}>
            1654 R. Don Road #304.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>
          <p className={classes.text}>
            2356 K. Laquie Rd #235.
            <br /> NewYork, 85022
            <br /> (602) 867-1011
          </p>
          <p className={classes.text}>
            1614 E. Erwin St #104.
            <br /> NewYork, 85022
            <br /> (602) 867-1012
          </p>
          <p className={classes.text}>
            1614 W. Caroll St #125.
            <br /> NewYork, 85022
            <br /> (602) 867-1013
          </p>
        </div>
        <div className={classes.card}>
          <h1 className={classes.title}>WORKING HOURS</h1>
          <p className={classes.text}>
            MONDAY UNTIL FRIDAY
            <br /> 9:00 – 22:00
          </p>
          <p className={classes.text}>
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
