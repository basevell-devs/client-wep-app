import React, { useState } from "react";

import AccountSidebar from "../../../components/AccountSidebar";
import Layout from "../../../components/Layout";
import AddressCard from "../../../components/AddressCard";
import AddAddress from "./add-address";

import styles from "./address.module.scss";
import { useAuth } from "../../../firebase/context";
import { useAddresses } from "hooks/address.hook";
import { useRouter } from "next/router";

const Addresses = () => {
  const [toggleModal, setModal] = useState(false);

  const { user } = useAuth();
  const userLoading = useAuth().loading;

  const { data, loading } = useAddresses();

  const { push } = useRouter();

  if (!user && !userLoading) push("/auth");

  return (
    <Layout noCategories>
      <AccountSidebar />
      <main className={styles.container}>
        <h1 className={styles.title}>My Addresses</h1>
        <div className={styles.content}>
          {loading ? (
            <span>Loading...</span>
          ) : data.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>You have not any address</p>
              <button className={styles.addAddress} onClick={() => setModal(true)}>
                <p>+</p>Add New Address
              </button>
            </div>
          ) : (
            <div className={styles.addresses}>
              <button className={styles.addAddress} onClick={() => setModal(true)}>
                <p>+</p>Add New Address
              </button>
              {data?.map((item) => {
                return <AddressCard data={item} key={item.id} />;
              })}
            </div>
          )}
        </div>
        {toggleModal && <AddAddress closeEvent={() => setModal(false)} />}
      </main>
    </Layout>
  );
};

export default Addresses;
