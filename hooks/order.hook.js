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

      const orderArr = data.docs[0]._document.data.value.mapValue.fields.orders;

      if (orderArr) {
        const orderData = await getDocs(collectionOrders, "Orders");

        setData(orderData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        console.log(orderData.docs.map((doc) => ({ ...doc.data(), id: doc.id, date: doc.data().date.toDate() })));
      }
    };
    // async function fetchFromFirestore() {
    //   auth.currentUser &&
    //     db
    //       .collection("Users")
    //       .doc(auth.currentUser.uid)
    //       .get()
    //       .then(function (doc) {
    //         const orders = doc.data().orders;
    //         console.log(orders);
    //         if (orders) {
    //           db.collection("Orders")
    //             .get()
    //             .then(function (querySnapshot) {
    //               const ordersArray = querySnapshot.docs
    //                 .filter((doc) => orders.includes(doc.id))
    //                 .map(function (doc) {
    //                   return {
    //                     id: doc.id,
    //                     ...doc.data(),
    //                     date: doc.data().date.toDate(),
    //                   };
    //                 });
    //               setData(ordersArray);
    //               setLoading(false);
    //             });
    //         }
    //       });
    // }

    fetchFromFirestore();
  }, [auth.currentUser]);

  return {
    data,
    loading,
    error,
  };
};

export { useOrders };
