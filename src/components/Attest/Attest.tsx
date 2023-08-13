import styles from "./style.module.scss";
import { Button, Input } from "antd";

const Attest = () => {
  return (
    <div className={styles.attest}>
      <h4 className={styles.title}>Attest meet with</h4>
      <Input placeholder={"Enter recipient ETH address here..."} />
      <Input placeholder={"Enter location of meet"} />
      <Input placeholder={"Enter context of meet"} />
      <Button>Attest </Button>
    </div>
  );
};

export { Attest };
