import React from "react";

import AccountSidebar from "../../../components/AccountSidebar";
import Layout from "../../../components/Layout";

import styles from "./orders.module.scss";
import { useAuth } from "../../../firebase/context";
import OrderItem from "../../../components/OrderItem";
import { useOrders } from "hooks/order.hook";
import { useRouter } from "next/router";

const Orders = () => {
  const { user, loading } = useAuth();

  const { data } = useOrders();

  const { push } = useRouter();

  if (!user && !loading) push("/auth");

  return (
    <Layout noCategories>
      <AccountSidebar />
      <main className={styles.container}>
        <h1 className={styles.title}>My Orders</h1>
        <div className={styles.content}>
          {data?.length === 0 ? (
            <span>You have not any order</span>
          ) : (
            <div className={styles.orders}>
              {data?.map((item) => {
                return <OrderItem data={item} key={item.id} />;
              })}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Orders;
