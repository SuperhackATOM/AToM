import { Button } from 'antd';
import { parseEther } from 'viem';
import { useSendTransaction, useAccount, useContractWrite } from 'wagmi';
import { erc20ABI } from 'wagmi';

const ContractWrite = () => {
  const { isConnected } = useAccount();
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: '0x5A2609D698DE041B1Ba77139A4229c8a161dDd9e',
    value: parseEther('0.01'),
  });

  // const { write } = useContractWrite({
  //   address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  //   abi: erc20ABI,
  //   functionName: 'transfer',
  //   args: ['0x5A2609D698DE041B1Ba77139A4229c8a161dDd9e', 1 ** 18],
  //   onError(error) {
  //     console.log('Error', error);
  //   },
  // });

  return (
    <div>
      {isConnected ? (
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button type="primary" onClick={() => sendTransaction()}>
            Send ETH
          </Button>
          {/* <Button type="primary" onClick={() => write()}>
            Send DAI
          </Button> */}
        </div>
      ) : (
        <p>Plaese Connect Wallet first</p>
      )}

      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
};

export default ContractWrite;
