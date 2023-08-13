import { useAccount, useContractWrite, useNetwork } from "wagmi";
import styles from "./style.module.scss";
import { Button, Input, message } from "antd";
import ATOM_abi from "../../abi/ATOM_abi.json";
import { useEffect, useState } from "react";
import { isAddress } from "viem";

const Attest = () => {
  const { address, isConnected } = useAccount();
  const [messageApi, contextHolder] = message.useMessage();
  const { chain } = useNetwork();
  const [contractAddress, setContractAddress] = useState<`0x${string}`>("");
  const [addressInput, setAddressInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [contextInput, setContextInput] = useState("");

  useEffect(() => {
    if (chain?.id === 84531) {
      //base testnet
      setContractAddress("0x2BbCDdD17B209dC70493807F62a46a6F3F261072");
    } else if (chain?.id === 999) {
      //zora testnet
      setContractAddress("0x2BbCDdD17B209dC70493807F62a46a6F3F261072");
    }
  }, []);

  useEffect(() => {
    if (chain?.id === 84531) {
      //base testnet
      setContractAddress("0x2BbCDdD17B209dC70493807F62a46a6F3F261072");
    } else if (chain?.id === 999) {
      //zora testnet
      setContractAddress("0x2BbCDdD17B209dC70493807F62a46a6F3F261072");
    }
  }, [chain]);

  const { write } = useContractWrite({
    address: contractAddress,
    abi: ATOM_abi,
    functionName: "mintATOM",
    args: [[address, addressInput], "0", "0x0102"],
    onError(error) {
      console.log("Error", error);
    },
  });

  const invalidAddressMessage = () => {
    messageApi.open({
      type: "warning",
      content: "Invalid address",
    });
  };

  const onAttest = () => {
    if (!isAddress(addressInput)) return invalidAddressMessage();

    write();
  };

  return (
    <div className={styles.attest}>
      {contextHolder}
      <h4 className={styles.title}>Attest meet with</h4>
      <Input
        placeholder={"Enter recipient ETH address here..."}
        onChange={(e) => setAddressInput(e.target.value)}
        value={addressInput}
      />
      <Input placeholder={"Enter location of meet"} />
      <Input placeholder={"Enter context of meet"} />
      <Button onClick={onAttest}>Attest on {chain?.name}</Button>
    </div>
  );
};

export { Attest };
