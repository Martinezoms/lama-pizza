import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import AddButton from "../components/AddButton";
import AddModal from "../components/AddModal";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import dbConnect from "../util/mongo";
import Product from "../models/Product";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";

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

  await dbConnect();
  const products = await Product.find();
  const response = await JSON.parse(JSON.stringify(products));

  return {
    props: {
      pizzaList: response,
      admin
    }
  };
};

export default Home;
