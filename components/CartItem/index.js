import React from "react";

import styles from "./cart-item.module.scss";
import { useProduct } from "hooks/product.hook";
import Image from "next/image";

const CartItem = ({ id, size, count, onAdd }) => {
  const { data } = useProduct(id);

  console.log(data);

  return (
    <div className={styles.container}>
      <Image src={data?.cover_photo || "Hello"} className={styles.image} loading="lazy" alt="" layout="fill" />
      <div className={styles.textContainer}>
        <h4>{data?.product_name || ""}</h4>
        <span>Size: {size || "-"}</span>
      </div>
      <span className={styles.price}>{data?.sale_price * count || "0"}$</span>
      <div className={styles.buttons}>
        <button>-</button>
        <span>{count || "0"}</span>
        <button onClick={() => onAdd(id, size)}>+</button>
      </div>
    </div>
  );
};

export default CartItem;
