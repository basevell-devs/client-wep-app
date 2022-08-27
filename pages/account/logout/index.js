import React from "react";

import { auth } from "../../../config/firebase";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();

  auth.signOut().finally(() => typeof window !== "undefined" && router.push("/login"));
  return <div></div>;
};

export default Logout;
