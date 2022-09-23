import { auth } from "../config/firebase";

import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";

const GoogleAuth = () => {
  const provider = new GoogleAuthProvider();

  signInWithRedirect(auth, provider);

  getRedirectResult(auth)
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
};

export default GoogleAuth;
