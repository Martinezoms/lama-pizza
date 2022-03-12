import classes from "../styles/AddButton.module.css";

const AddButton = ({ setClose }) => {
  return (
    <div className={classes.addBtn} onClick={() => setClose(false)}>
      Add New Pizza
    </div>
  );
};

export default AddButton;
