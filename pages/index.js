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

  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const response = await axios.get("http://localhost:3000/api/products/");
  console.log(response);
  return {
    props: {
      pizzaList: response.data,
      admin
    }
  };
};

export default Home;
