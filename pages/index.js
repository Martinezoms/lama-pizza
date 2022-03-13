import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import AddButton from "../components/AddButton";
import AddModal from "../components/AddModal";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";

function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <div>
      <Head>
        <title>Lama Pizza</title>
        <meta name="description" content="Best pizza restaurant in New york" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <AddModal setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies;
  let url = process.env.DEV_URL;

  if (process.env.NODE_ENV === "production") {
    url = process.env.PROD_URL;
  }

  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const response = await axios.get(`${url}/api/products/`);

  return {
    props: {
      pizzaList: response.data,
      admin
    }
  };
};

export default Home;
