import React, { ReactElement } from "react";

import styles from "./social-button.module.scss";
import GoogleIcon from "../icons/google";
import AppleIcon from "../icons/apple";

const SocialMediaButton = ({ icon, children, ...props }: { icon: string; children: ReactElement }) => {
  return (
    <button className={styles.container} {...props}>
      {icon === "google" && <GoogleIcon />}
      {icon === "apple" && <AppleIcon />}
      {children}
    </button>
  );
};

export default SocialMediaButton;
