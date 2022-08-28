import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const useAddresses = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const collectionData = collection(db, "Users");
  const collectionAddress = collection(db, "Addresses");

  useEffect(() => {
    const fetchFromFirestore = async () => {
      const data = await getDocs(collectionData);

      const address = data.docs[0]._document.data.value.mapValue.fields.addresses;

      if (address) {
        const addressData = await getDocs(collectionAddress, "Addresses");

        const addressesArr = addressData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setData(addressesArr);

        setLoading(false);
      } else {
        setError("Something went wrong...");
      }
    };

    fetchFromFirestore();
  }, [auth.currentUser]);

  return {
    data,
    loading,
    error,
  };
};

const useAddress = (id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const collectionData = collection(db, "Users");
  const collectionAddress = collection(db, "Addresses");

  useEffect(() => {
    const fetchFromFirestore = async () => {
      const data = await getDocs(collectionData);

      const address = data.docs[0]._document.data.value.mapValue.fields.addresses;

      if (address) {
        const addressData = await getDocs(collectionAddress, "Addresses");

        const addressesArr = addressData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setData(addressesArr);

        setLoading(false);
      } else {
        setError("Something went wrong...");
      }
    };

    fetchFromFirestore();
  }, [auth.currentUser]);

  return {
    data,
    loading,
    error,
  };
};

export { useAddresses, useAddress };
