import React from "react";

import styles from "./vertical.module.scss";
import Link from "next/link";
import Image from "next/image";

const VerticalCard = ({ bgColor, brand, name, price, sale_price, image, border, href, ...props }) => {
  return (
    <Link href={href || "#"}>
      <div
        className={styles.verticalCard}
        style={{
          backgroundColor: bgColor || "",
          border: border && "2px solid #eee",
        }}
      >
        {sale_price && price && (
          <button className={styles.favContainer}>{(((price - sale_price) / price) * 100) | 0}%</button>
        )}
        <div className={styles.imageContainer}>
          {image && <Image className={styles.image} src={image} loading="lazy" alt="" layout="fill" />}
        </div>
        <div className={styles.textContainer}>
          <h4 className={styles.brandText}>{brand}</h4>
          <h4>{name}</h4>
          {sale_price ? (
            <div className={styles.priceContainer}>
              <div className={styles.prices}>
                <span className={styles.priceText}>{price}&#8358;</span>
                <span className={styles.salePriceText}>{sale_price}&#8358;</span>
              </div>
            </div>
          ) : (
            <span className={styles.salePriceText}>{price || 0}&#8358;</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default VerticalCard;
