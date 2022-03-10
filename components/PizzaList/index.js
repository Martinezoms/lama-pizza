import classes from "../../styles/PizzaList.module.css";
import { PizzaCard } from "./PizzaCard";

const PizzaList = ({ pizzaList }) => {
  return (
    <section className={classes.container}>
      <h1 className={classes.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={classes.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu in pretium molestie. Interdum et
        malesuada fames acme. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <div className={classes.wrapper}>
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} {...pizza} />
        ))}
      </div>
    </section>
  );
};

export default PizzaList;
