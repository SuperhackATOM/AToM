import "antd/dist/reset.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import "../styles/globals.scss";

import {
  zoraTestnet,
  zora,
  mainnet,
  optimism,
  optimismGoerli,
  baseGoerli,
} from "wagmi/chains";
import { Header } from "@/components/Layout/Header/Header";

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { publicClient, chains } = configureChains(
    [mainnet, zora, zoraTestnet, optimism, optimismGoerli, baseGoerli],
    [publicProvider()]
  );

  const config = createConfig(
    getDefaultConfig({
      walletConnectProjectId: "da6313719cfeb6f79fe91e37e479d4ed",
      appName: "POM",
      chains,
      publicClient,
    })
  );

  return (
    mounted && (
      <WagmiConfig config={config}>
        <ConnectKitProvider>
          <Header />
          <div className={"wrapper"}>
            <Component {...pageProps} />
          </div>
        </ConnectKitProvider>
      </WagmiConfig>
    )
  );
}
