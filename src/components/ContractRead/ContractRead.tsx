import { Button } from 'antd';
import { useState } from 'react';
import { Hash, formatUnits } from 'viem';
import { useContractRead } from 'wagmi';
import { erc20ABI } from 'wagmi';

const tokenAddress = {
  usdc: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  dai: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
};

const ContractRead = () => {
  const [address, setAddress] = useState(tokenAddress.usdc);
  const { data: name } = useContractRead({
    address: address as Hash,
    abi: erc20ABI,
    functionName: 'name',
  });

  const { data: symbol } = useContractRead({
    address: address as Hash,
    abi: erc20ABI,
    functionName: 'symbol',
  });

  const { data: decimals } = useContractRead({
    address: address as Hash,
    abi: erc20ABI,
    functionName: 'decimals',
  });
  const { data: totalSupply } = useContractRead({
    address: address as Hash,
    abi: erc20ABI,
    functionName: 'totalSupply',
  });

  return (
    <>
      {name && symbol && decimals && totalSupply && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ wordBreak: 'break-all' }}>token address : {address}</p>
          <p>token name : {name}</p>
          <p>token symbol : {symbol}</p>
          <p>token decimals : {decimals}</p>
          <p>token totalSupply : {formatUnits(totalSupply, decimals)}</p>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <Button
              type="primary"
              onClick={() => {
                setAddress(tokenAddress.usdc);
              }}
            >
              USDC
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setAddress(tokenAddress.dai);
              }}
            >
              DAI
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContractRead;
