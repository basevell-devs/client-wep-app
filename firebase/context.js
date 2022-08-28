import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // const getCurrentUser = () => {
  //   auth.currentUser?.uid
  //     ? db
  //         .collection("Users")
  //         .doc(auth.currentUser.uid)
  //         .get()
  //         .then((doc) => {
  //           setUser(doc.data());
  //           setLoading(false);
  //         })
  //     : setLoading(false);
  // };

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, getCurrentUser());

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // const auth = AuthContextProvider();
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
