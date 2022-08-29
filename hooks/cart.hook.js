import { useState, useEffect } from "react";
import { db, auth } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const useCart = (id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const collectionData = collection(db, "Users");
  const collectionCart = collection(db, "Products");

  useEffect(() => {
    const reqData = async () => {
      const data = await getDocs(collectionData);
      const cart = data.docs[0]._document.data.value.mapValue.fields.cart;

      if (cart) {
        const addressData = await getDocs(collectionCart, "Products");

        const cartArr = addressData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setData(cartArr);
        setLoading(false);
      } else {
        setError("Something went wrong...");
      }
    };

    reqData();
  }, [collectionCart, collectionData]);

  return {
    data,
    loading,
    error,
  };
};

export const useCartOnce = (id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log("once");

  useEffect(() => {
    async function fetchFromFirestore() {
      // console.log("once inner");

      db.collection("Users")
        .doc(auth.currentUser?.uid)
        .get()
        .then(function (doc) {
          setData(doc.data().cart);
          setLoading(false);
        })
        .catch((e) => setError(e));
    }
    auth.currentUser?.uid && fetchFromFirestore();
  }, []);

  return {
    data,
    loading,
    error,
  };
};
