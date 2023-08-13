import {useAccount, useContractWrite, useNetwork, useSwitchNetwork} from "wagmi";
import styles from "./style.module.scss";
import {Button, Input, message, Modal, Space} from "antd";
import { isAddress, createWalletClient } from "viem";
import {useEffect, useMemo, useState} from "react";
import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';
import { SCHEMAS } from './Schema';
import { useWalletClient, type WalletClient } from 'wagmi';

import { BrowserProvider, JsonRpcSigner } from 'ethers'

const Attest = () => {
    const { address, isConnected } = useAccount();
    const [messageApi, contextHolder] = message.useMessage();
    const { chain } = useNetwork();
    const [contractAddress, setContractAddress] = useState<`0x${string}`>(`0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A`);
    const [addressInput, setAddressInput] = useState("");
    const [locationInput, setLocationInput] = useState("");
    const [contextInput, setContextInput] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { chains, error, isLoading, pendingChainId, switchNetwork } =
        useSwitchNetwork();
    const [transactionHash, setTransactionHash] = useState('')
    const jaden_address = "0xF7423cF85d8FD5944c4BB29c99844bB1995B7Bb3";
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (chain?.id === 84531) {
            //base testnet
            setContractAddress("0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A");
        } else if (chain?.id === 999) {
            //zora testnet
            setContractAddress("0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A");
        }
    }, []);

    useEffect(() => {
        if (chain?.id === 84531) {
            //base testnet
            setContractAddress("0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A");
        } else if (chain?.id === 999) {
            //zora testnet
            setContractAddress("0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A");
        }
    }, [chain]);

    const eas = new EAS(`0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A`);

     function walletClientToSigner(walletClient: WalletClient) {
        const { account, chain, transport } = walletClient
        const network = {
            chainId: chain.id,
            name: chain.name,
            ensAddress: chain.contracts?.ensRegistry?.address,
        }
        const provider = new BrowserProvider(transport, network)
        const signer = new JsonRpcSigner(provider, account.address)
        return signer
    }

    /** Hook to convert a viem Wallet Client to an ethers.js Signer. */
    function useEthersSigner({ chainId }: { chainId?: number } = {}) {
        const { data: walletClient } = useWalletClient({ chainId })
        return useMemo(
            () => (walletClient ? walletClientToSigner(walletClient) : undefined),
            [walletClient],
        )
    }

    // const {data: wagmiSigner} = useWalletClient();
    const signer = useEthersSigner()
    console.log(signer)
    eas.connect(signer as any);

    const location = "Seoul";
    const context = "ETHSEOUL Hackathon";
    const schemaEncoder = new SchemaEncoder("bool ATestationOfMeet, string location, string context");
    const encoded_data = schemaEncoder.encodeData([
        { name: "ATestationOfMeet", type: 'bool', value: true },
        { name: "location", type: "string", value: location },
        { name: "context", type: "string", value: context }
    ]);




    const invalidAddressMessage = () => {
        messageApi.open({
            type: "warning",
            content: "Invalid address",
        });
    };

    const onAttest = () => {
        if (!isAddress(addressInput)) return invalidAddressMessage();
        const tx = eas.attest({
            data: {
                recipient: addressInput,
                data: encoded_data,
                refUID: ethers.ZeroHash,
                revocable: false,
            },
            schema: SCHEMAS.ATOM_SCHEMA
        })

        tx.then((res) => {
            setTransactionHash(res.tx.hash)
        })

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
            {/*<Modal*/}
            {/*    title="Choose network"*/}
            {/*    open={isModalOpen}*/}
            {/*    onOk={handleOk}*/}
            {/*    onCancel={handleCancel}*/}
            {/*>*/}
            {/*    {chain && <div>Connected to {chain.name}</div>}*/}

            {/*    <Space direction="vertical">*/}
            {/*        <br />*/}
            {/*        {chains.map((x) => (*/}
            {/*            <Button*/}
            {/*                disabled={!switchNetwork || x.id === chain?.id}*/}
            {/*                key={x.id}*/}
            {/*                onClick={() => switchNetwork?.(x.id)}*/}
            {/*            >*/}
            {/*                {x.name}*/}
            {/*                {isLoading && pendingChainId === x.id && " (switching)"}*/}
            {/*            </Button>*/}
            {/*        ))}*/}
            {/*    </Space>*/}
            {/*</Modal>*/}
            <Button onClick={onAttest}>Make attestation</Button>
            <span className={styles.hash}>
                <a href={`https://base-goerli.easscan.org/schema/view/0x22cc8bd78942a630e45ac11521b9d126675b9e1958c5a269cdbda9c2749dd872`}>{transactionHash}</a>

            </span>
        </div>
    );
};

export { Attest };
