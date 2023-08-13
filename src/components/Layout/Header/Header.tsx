import Link from "next/link";
import styles from "./style.module.scss";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { Navigation } from "@/components/Layout/Navigation/Navigation";
import attest from "@/assets/attest.svg";
import graph from "@/assets/graph.svg";
import connections from "@/assets/connections.svg";
// import { Button } from "@/components/Button/Button";
import { useAccount, useDisconnect, useEnsName } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { Button } from "antd";

const Header = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();
  const navLinks = [
    { label: "Attest meet", href: "/", img: attest },
    { label: "My connections", href: "/connections", img: connections },
    { label: "Social graph", href: "/graph", img: graph },
  ];

  return (
    <header className={styles.header}>
      <Link href={"/"} className={styles.logoLink}>
        <div className={styles.logo}>
          <Image
            priority
            quality={100}
            unoptimized
            width={32}
            height={32}
            draggable={false}
            src={logo.src}
            alt={"logo"}
          />
          <h1>AtOM</h1>
        </div>
      </Link>
      <div className={styles.middleMenu}>
        <Navigation navLinks={navLinks} />
      </div>
      {/* <Button text={"0x8675*****a8f2"} /> */}

      {isConnected ? (
        <Button danger size="middle" onClick={() => disconnect()}>
          {ensName ? ensName : address}
        </Button>
      ) : (
        <ConnectKitButton theme="soft" mode="light" />
      )}
    </header>
  );
};

export { Header };
