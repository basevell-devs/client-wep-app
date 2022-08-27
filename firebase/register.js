import { auth, db } from "../config/firebase";

export const emailRegister = ({ email, password }) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const registerDatabase = ({ id, email, name, surname }) => {
  return db.collection("Users").doc(id).set({
    name,
    surname,
    email,
    addresses: [],
    cart: {},
    favorites: [],
    orders: [],
    phoneNumber: "",
    photoUrl: null,
  });
};
