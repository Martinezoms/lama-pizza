import axios from "axios";
import Head from "next/head";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";

export default function Home({ pizzaList }) {
  return (
    <div>
      <Head>
        <title>Lama Pizza</title>
        <meta name="description" content="Best pizza restaurant in New york" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList pizzaList={pizzaList} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const response = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      pizzaList: response.data
    }
  };
};
