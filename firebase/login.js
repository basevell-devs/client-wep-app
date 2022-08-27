import { auth } from "../config/firebase";

const emailLogin = ({ email, password }) => auth.signInWithEmailAndPassword(email, password);

export default emailLogin;
