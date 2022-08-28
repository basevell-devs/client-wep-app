import React, { useState, useEffect } from "react";

import AccountSidebar from "../../../components/AccountSidebar";
import Layout from "../../../components/Layout";

import { collection, getDocs } from "firebase/firestore";

import styles from "./favorites.module.scss";
import { useAuth } from "../../../firebase/context";
import { db, auth } from "../../../config/firebase";
import ProductCard from "../../../components/ProductCard/product-card";
import { useRouter } from "next/router";

const Favorites = () => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  const collectionProducts = collection(db, "Products");

  const { user } = useAuth();
  const userLoading = useAuth().loading;

  useEffect(() => {
    const fetchFromFirestore = async () => {
      const data = await getDocs(collectionProducts);

      const product = data.docs[0]._document.data.value.mapValue.fields.product_name;

      if (product) {
        const productData = await getDocs(collectionProducts, "Products");

        const productArray = productData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProducts(productArray);

        setLoading(false);
      }
    };

    fetchFromFirestore();

    user && console.log(user);
    // user?.favorites.length > 0 &&
    //   db
    //     .collection("Products")
    //     .get()
    //     .then((querySnapshot) => {
    //       setProducts(
    //         querySnapshot.docs
    //           .filter((item) => user.favorites.includes(item.id))
    //           .map((doc) => {
    //             return { id: doc.id, ...doc.data() };
    //           }),
    //       );
    //       setLoading(false);
    //     });
  }, [user]);

  if (!user && !userLoading) useRouter().push("/login");

  return (
    <Layout noCategories>
      <AccountSidebar />
      <main className={styles.container}>
        <h1 className={styles.title}>My Favorites</h1>
        <div className={styles.content}>
          <div className={styles.products}>
            {products?.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  brand={product.brand}
                  name={product.product_name}
                  image={product.cover_photo}
                  price={product.price}
                  sale_price={product.sale_price}
                  favorite={user?.favorites?.includes(product.id)}
                />
              );
            })}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Favorites;
