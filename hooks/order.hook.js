import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const useOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const collectionData = collection(db, "Users");
  const collectionOrders = collection(db, "Orders");

  useEffect(() => {
    const fetchFromFirestore = async () => {
      const data = await getDocs(collectionData);

      const orders = data.docs[0]._document.data.value.mapValue.fields.orders;

      if (orders) {
        const orderData = await getDocs(collectionOrders, "Orders");

        const ordersArray = orderData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          date: doc.data().date.toDate(),
        }));

        setData(ordersArray);

        setLoading(false);
      } else {
        setError("Something went wrong...");
      }
    };

    fetchFromFirestore();
  }, [collectionData, collectionOrders]);

  return {
    data,
    loading,
    error,
  };
};

export { useOrders };
