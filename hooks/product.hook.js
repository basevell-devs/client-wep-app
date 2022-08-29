import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

export const useProduct = (id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const collectionData = collection(db, "Users");
  const collectionProducts = collection(db, "Products");

  useEffect(() => {
    const fetchFromFirestore = async () => {
      const data = await getDocs(collectionData);
      const products = data.docs[0]._document.data.value.mapValue.fields.cart;

      if (products) {
        const productData = await getDocs(collectionProducts, "Products");

        const productArr = productData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setData(productArr);

        setLoading(false);
      } else {
        setError("Something went wrong...");
      }
    };

    fetchFromFirestore();
  }, [collectionData, collectionProducts, id]);

  return {
    data,
    loading,
    error,
  };
};

export const useCategoryProducts = (category) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFromFirestore() {
      db.collection("Products")
        .where("category", "==", category)
        .get()
        .then(function (querySnapshot) {
          const products = querySnapshot.docs.map(function (doc) {
            return { id: doc.id, ...doc.data() };
          });
          setData(products);
          setLoading(false);
        })
        .catch((e) => setError(e));
    }

    fetchFromFirestore();
  }, [category]);

  return {
    data,
    loading,
    error,
  };
};
