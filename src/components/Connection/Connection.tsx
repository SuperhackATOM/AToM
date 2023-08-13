"use client";

import { Button, Modal, Space } from "antd";
import styles from "./style.module.scss";
import { useState } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";
// import Image from "next/image";

const Connection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
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
