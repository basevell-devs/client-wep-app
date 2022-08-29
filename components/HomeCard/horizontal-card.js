import Image from "next/image";
import React from "react";

import styles from "./horizontal.module.scss";

const HorizontalCard = ({ bgColor, title, desc, image, ...props }) => {
  if (!desc) {
    return (
      <div className={styles.horizontalCard} style={{ backgroundColor: bgColor || "" }}>
        <div className={styles.textContainer} style={{ padding: 0, marginRight: 0 }}>
          <h3 style={{ marginBottom: 0, fontSize: 32 }}>{title}</h3>
        </div>
        <Image className={styles.bgImage} src={image} alt="" layout="fill" />
      </div>
    );
  }

  return (
    <div className={styles.horizontalCard} style={{ backgroundColor: bgColor || "" }}>
      <div className={styles.textContainer}>
        <h3>{title}</h3>
        <span className={styles.description}>{desc}</span>
      </div>
      {image && (
        <div className={styles.imageContainer}>
          <Image className={styles.image} src={image} alt="" layout="fill" />
        </div>
      )}
    </div>
  );
};

export default HorizontalCard;
