import Head from "next/head";
import styles from "./cart.module.scss";

import Layout from "../../components/Layout";
import CartItem from "../../components/CartItem";
import { useCart } from "hooks/cart.hook";
import React from "react";
import { useAuth } from "../../firebase/context";
import { addToCart } from "../../firebase/product";
import { useRouter } from "next/router";

const CartPage = () => {
  const { user, loading } = useAuth();
  const { data } = useCart();

  // const sizeCount = data.reduce(
  //   (acc, value) => ({
  //     ...acc,
  //     [value.name + "__size__" + value.size]: (acc[value.name + "__size__" + value.size] || 0) + 1,
  //   }),
  //   {},
  // );

  // const cartItemsArray = [
  //   ...new Set(cartItems.filter((v, i, a) => a.findIndex((t) => t.name === v.name && t.size === v.size) === i)),
  // ].map((item) => {
  //   return { ...item, count: sizeCount[item.name + "__size__" + item.size] };
  // });

  const addCartEvent = (id, size) => {
    const newCart = size
      ? {
          ...data,
          [id]: data.hasOwnProperty(id) ? [...data[id], size] : [size],
        }
      : {
          ...data,
          [id]: data.hasOwnProperty(id) ? [...data[id], "-"] : ["-"],
        };
    console.log(newCart);
    addToCart(newCart);
  };

  const router = useRouter();

  if (!loading && !user && typeof window !== "undefined") router.push("/login");

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.title}>My Cart</h1>
            <h4>You have {data.length} items in your cart</h4>
          </div>
          {data.map((item, index) => (
            <CartItem key={index} id={item.name} size={item.size} count={item.count} onAdd={addCartEvent} />
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default CartPage;
