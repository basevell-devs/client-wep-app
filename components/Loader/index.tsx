import Loader from "../icons/Loader";
import styles from "./loader.module.scss";

const index = (props: any) => {
  return (
    <div className={styles.glassBackground}>
      <Loader {...props} />
    </div>
  );
};

export default index;
