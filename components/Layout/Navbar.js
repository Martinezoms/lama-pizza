import { useState } from "react";
import Image from "next/image";
import classes from "../../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <section className={classes.container}>
      <div className={classes.item}>
        {toggleMenu ? (
          <div className={classes.menuBtn}>
            <span onClick={() => setToggleMenu(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="#fff"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </span>
          </div>
        ) : (
          <div className={classes.menuBtn}>
            <span onClick={() => setToggleMenu(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="#fff"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-align-justify"
              >
                <line x1="21" y1="10" x2="3" y2="10"></line>
                <line x1="21" y1="6" x2="3" y2="6"></line>
                <line x1="21" y1="14" x2="3" y2="14"></line>
                <line x1="21" y1="18" x2="3" y2="18"></line>
              </svg>
            </span>
          </div>
        )}
        {toggleMenu && (
          <div className={classes.navLink}>
            <Link href="/" passHref>
              <p>Homepage</p>
            </Link>
            <p>Products</p>
            <p>Menu</p>
            <p>Events</p>
            <p>Blog</p>
            <p>Contact</p>
          </div>
        )}
      </div>

      <div className={classes.item}>
        <div className={classes.callBtn}>
          <Image src="/images/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={classes.texts}>
          <div className={classes.text}>ORDER NOW!</div>
          <div className={classes.text}>012 345 678</div>
        </div>
      </div>
      <div className={classes.item}>
        <ul className={classes.list}>
          <Link href="/" passHref>
            <li>Homepage</li>
          </Link>
          <li>Products</li>
          <li>Menu</li>
          <Image src="/images/logo.png" alt="" width="160px" height="69px" />
          <li>Events</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
      </div>
      <Link href="/cart" passHref>
        <div className={classes.item}>
          <div className={classes.cart}>
            <Image src="/images/cart.png" alt="" width="30px" height="30px" />
            <div className={classes.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default Navbar;
