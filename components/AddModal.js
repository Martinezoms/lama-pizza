import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import classes from "../styles/AddModal.module.css";

const AddModal = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState({});

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = () => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/zoms/image/upload", data);

      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url
      };

      await axios.post("http://localhost:3000/api/products", newProduct);
      setClose(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <span onClick={() => setClose(true)} className={classes.close}>
          X
        </span>
        <h1>Add a new Pizza</h1>
        <div className={classes.item}>
          <label className={classes.label}>Choose an image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={classes.item}>
          <label className={classes.label}>Title</label>
          <input className={classes.input} type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className={classes.item}>
          <label className={classes.label}>Desc</label>
          <textarea rows={4} type="text" onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className={classes.item}>
          <label className={classes.label}>Prices</label>
          <div className={classes.priceContainer}>
            <input
              className={`${classes.input} ${classes.inputSm}`}
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${classes.input} ${classes.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${classes.input} ${classes.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={classes.item}>
          <label className={classes.label}>Extra</label>
          <div className={classes.extra}>
            <input
              className={`${classes.input} ${classes.inputSm}`}
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`${classes.input} ${classes.inputSm}`}
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button className={classes.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={classes.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={classes.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={classes.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default AddModal;
