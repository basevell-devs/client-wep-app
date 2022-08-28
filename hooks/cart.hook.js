import { db, auth } from "../config/firebase";
import { useState, useEffect } from "react";
import { onSnapshot } from "@firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

export const useCart = (id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setData(user.cart);

        // console.log(user);
      } else {
        setError("Something went wrong...");
        setLoading(false);
      }
    });
  }, [auth.currentUser]);

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
  }, [auth.currentUser]);

  return {
    data,
    loading,
    error,
  };
};
