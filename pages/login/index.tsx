import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "./login.module.scss";
import LoginForm from "./FormLogin";
import RegisterForm from "./FormRegister";
import { auth } from "../../config/firebase";
import { getRedirectResult } from "firebase/auth";

const LoginPage = () => {
  const [page, setPage] = useState("login");

  const router = useRouter();

  // auth.onAuthStateChanged(function (user) {
  //   if (user) {
  //     // console.log(user);
  //     typeof window !== "undefined" && router.push("/");
  //   }
  // });

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          router.push("/");
        }
      })
      .catch((error) => console.log(error));
  }, [router]);

  return (
    <div className={styles.container}>
      <a className={styles.logo}>Basevell</a>
      <div className={styles.content}>
        <div className={styles.switchContainer}>
          <button
            className={styles.switchButton}
            onClick={() => setPage("login")}
            style={{ backgroundColor: page === "login" ? "white" : "#f6f6f6" }}
          >
            <span>Login</span>
          </button>
          <button
            className={styles.switchButton}
            onClick={() => setPage("register")}
            style={{
              backgroundColor: page === "register" ? "white" : "#f6f6f6",
            }}
          >
            <span>Register</span>
          </button>
        </div>
        {page === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default LoginPage;
