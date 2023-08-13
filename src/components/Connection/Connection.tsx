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

const Connection = ({
  recipientAddress,
  timestamp,
}: {
  recipientAddress: string;
  timestamp: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  const { address, isConnected } = useAccount();
  const [messageApi, contextHolder] = message.useMessage();
  const [contractAddress, setContractAddress] = useState<`0x${string}`>(
    "0x2BbCDdD17B209dC70493807F62a46a6F3F261072"
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

  const _timestamp = timestamp * 1000;
  const date = new Date(_timestamp);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const { write } = useContractWrite({
    address: contractAddress,
    abi: ATOM_abi,
    functionName: "mintATOM",
    args: [[address, recipientAddress], "0", "0x0102"],
    onError(error) {
      Modal.error({
        title: "Failed to mint ATOM",
        content: (
          <>
            <p style={{ wordBreak: "break-all" }}> Failed </p>
          </>
        ),
      });
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

  const invalidAddressMessage = () => {
    messageApi.open({
      type: "warning",
      content: "Invalid address",
    });
  };

  const onAttest = () => {
    if (!isAddress(recipientAddress)) return invalidAddressMessage();

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
        <span className={styles.address}>{recipientAddress}</span>
        <div className={styles.date}>
          <span className={styles.date__top}>
            {day}/{month}/{year}
          </span>
          <span className={styles.date__bottom}>
            {hours}:{minutes}:{seconds}{" "}
          </span>
        </div>

        {/*<Image className={styles.approved} src={} alt={}/>*/}
        <span>*</span>
      </div>
      <Button onClick={showModal}>Verify</Button>
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
