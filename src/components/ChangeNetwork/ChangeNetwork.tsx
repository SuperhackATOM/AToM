import { Button } from "antd";
import { useNetwork, useSwitchNetwork } from "wagmi";

const ChangeNetwork = () => {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  return (
    <>
      {chain && <div>Connected to {chain.name}</div>}

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

      <div>{error && error.message}</div>
    </>
  );
};

export default ChangeNetwork;
