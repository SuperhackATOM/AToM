"use client";

import { Button, Modal, Space, Typography, message } from "antd";
import styles from "./style.module.scss";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
// import Image from "next/image";
import ATOM_abi from "../../abi/ATOM_abi.json";
import { useEffect, useState } from "react";
import { isAddress } from "viem";

const { Text, Link } = Typography;

const Connection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  const { address, isConnected } = useAccount();
  const [messageApi, contextHolder] = message.useMessage();
  const [contractAddress, setContractAddress] = useState<`0x${string}`>(
    "0x2BbCDdD17B209dC70493807F62a46a6F3F261072"
  );
  const [addressInput, setAddressInput] = useState(
    "0xC7F5D837671539FFc7fDDd4B9E08cCcC1f984B4C"
  );

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
    onSuccess(data) {
      Modal.success({
        title: "Successfully minted ATOM",
        content: (
          <>
            <p style={{ wordBreak: "break-all" }}>
              Transaction hash: {data.hash}
            </p>
            <Text
              type="success"
              style={{ cursor: "pointer" }}
              onClick={() =>
                window.open(
                  `${chain?.blockExplorers?.default.url}/tx/${data.hash}`,
                  "_blank"
                )
              }
            >
              Open the Scan
            </Text>
          </>
        ),
      });
    },
  });

  console.log(chain);

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // onChange={(e) => setAddressInput(e.target.value)}
    // value={addressInput}
    onAttest();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {" "}
      {contextHolder}
      <div className={styles.connection}>
        {/*<Image src={} alt={}/>*/}
        <span className={styles.address}>
          0x8675a1C67BD6e644155fC88a8E83Ee84A4a8a8f2
        </span>
        <div className={styles.date}>
          <span className={styles.date__top}>08/11/2023</span>
          <span className={styles.date__bottom}>1:02:51 am</span>
        </div>

        {/*<Image className={styles.approved} src={} alt={}/>*/}
        <span>*</span>
      </div>
      <Button type="primary" onClick={showModal}>
        Verify
      </Button>
      <Modal
        title="Choose network"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={`Mint on ${chain?.name}`}
      >
        {chain && <div>Connected to {chain.name}</div>}

        <Space direction="vertical">
          <br />
          {chains.map((x) => (
            <Button
              disabled={!switchNetwork || x.id === chain?.id}
              key={x.id}
              onClick={() => switchNetwork?.(x.id)}
            >
              {x.name}
              {isLoading && pendingChainId === x.id && " (switching)"}
            </Button>
          ))}
        </Space>
      </Modal>
    </div>
  );
};

export { Connection };
