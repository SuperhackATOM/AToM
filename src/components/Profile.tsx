import { Button } from "antd";
import { ConnectKitButton } from "connectkit";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useNetwork,
  useSignMessage,
} from "wagmi";

const Profile = () => {
  const { chain, chains } = useNetwork();
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: "gm POM frens",
  });

  return (
    <div>
      {isConnected ? (
        <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
          {chain && <div>Connected to {chain.name}</div>}
          {chains && (
            <div>
              Available chains: {chains.map((chain: any) => chain.name)}
            </div>
          )}

          <div>Connected to {ensName ?? address}</div>
          {isSuccess && (
            <div style={{ wordBreak: "break-all" }}>Signature: {data}</div>
          )}
          {isError && <div>Error signing message</div>}

          <Button type="primary" size="large" onClick={() => signMessage()}>
            {isLoading ? "Signing..." : "Sign message"}
          </Button>
          <Button danger size="large" onClick={() => disconnect()}>
            Disconnect Wallet
          </Button>
        </div>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {/* {connectors.map((connector) => (
            <Button
              key={connector.id}
              type="primary"
              size="large"
              onClick={() => connect({ connector })}
              style={{
                backgroundColor: connector.name === "MetaMask" ? "#F48420" : "",
              }}
            >
              Connect {connector.name}
            </Button>
          ))} */}

          <ConnectKitButton theme="soft" mode="light" />
        </div>
      )}
    </div>
  );
};
export default Profile;
