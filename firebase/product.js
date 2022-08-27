import { firebase, auth, db } from "../config/firebase";

export const addFavorite = (id) => {
  const currentUser = auth.currentUser.uid;

  return db
    .collection("Users")
    .doc(currentUser)
    .update({
      favorites: firebase.firestore.FieldValue.arrayUnion(id),
    });
};

export const removeFavorite = (id) => {
  const currentUser = auth.currentUser.uid;

  return db
    .collection("Users")
    .doc(currentUser)
    .update({
      favorites: firebase.firestore.FieldValue.arrayRemove(id),
    });
};

export const addToCart = (newCart) => {
  const currentUser = auth.currentUser.uid;

  return db.collection("Users").doc(currentUser).update({
    cart: newCart,
  });
};
