import { Connection } from "@/components/Connection/Connection";
import styles from "./style.module.scss";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Empty, Typography } from "antd";

const { Title, Text } = Typography;

export default function Connections() {
  const { address, isConnected } = useAccount();
  const [baseClientData, setBaseClientData] = useState<any>();
  const [sepoliaClientData, setSepoliaClientData] = useState<any>();
  const [optimismClientData, setOptimismClientData] = useState<any>();

  useEffect(() => {
    if (!isConnected) return;
    const baseClient = new ApolloClient({
      uri: "https://base-goerli.easscan.org/graphql",
      cache: new InMemoryCache(),
    });

    baseClient
      .query({
        query: gql`
          query Query($where: AttestationWhereInput) {
            attestations(where: $where) {
              recipient
              schemaId
              time
            }
          }
        `,
        variables: {
          where: {
            attester: {
              equals: address,
            },
            schemaId: {
              equals:
                "0x22cc8bd78942a630e45ac11521b9d126675b9e1958c5a269cdbda9c2749dd872",
            },
          },
        },
      })
      .then((result: any) => setBaseClientData(result.data));

    const sepoliaClient = new ApolloClient({
      uri: "https://sepolia.easscan.org/graphql",
      cache: new InMemoryCache(),
    });

    sepoliaClient
      .query({
        query: gql`
          query Query($where: AttestationWhereInput) {
            attestations(where: $where) {
              recipient
              schemaId
              time
            }
          }
        `,
        variables: {
          where: {
            attester: {
              equals: address,
            },
            schemaId: {
              equals:
                "0x22cc8bd78942a630e45ac11521b9d126675b9e1958c5a269cdbda9c2749dd872",
            },
          },
        },
      })
      .then((result) => setSepoliaClientData(result.data));

    const optimismClient = new ApolloClient({
      uri: "https://optimism-goerli-bedrock.easscan.org/graphql",
      cache: new InMemoryCache(),
    });

    optimismClient
      .query({
        query: gql`
          query Query($where: AttestationWhereInput) {
            attestations(where: $where) {
              recipient
              schemaId
              time
            }
          }
        `,
        variables: {
          where: {
            attester: {
              equals: address,
            },
            schemaId: {
              equals:
                "0x22cc8bd78942a630e45ac11521b9d126675b9e1958c5a269cdbda9c2749dd872",
            },
          },
        },
      })
      .then((result) => setOptimismClientData(result.data));
  }, []);

  return (
    <div className={styles.connections}>
      <h4>My connections</h4>

      {isConnected ? (
        <>
          <Title level={4} style={{ marginTop: " 48px" }}>
            Base
          </Title>
          {baseClientData?.attestations.length !== 0 ? (
            baseClientData?.attestations.map(
              (attestations: any, idx: number) => (
                <Connection
                  recipientAddress={attestations.recipient}
                  timestamp={attestations.time}
                  key={idx}
                />
              )
            )
          ) : (
            <Empty />
          )}

          {/* <Title level={4} style={{ marginTop: " 48px" }}>
            Sepolia
          </Title>
          {sepoliaClientData?.attestations.length !== 0 ? (
            sepoliaClientData?.attestations.map(
              (attestations: any, idx: number) => (
                <Connection
                  recipientAddress={attestations.recipient}
                  timestamp={attestations.time}
                  key={idx}
                />
              )
            )
          ) : (
            <Empty />
          )} */}

          <Title level={4} style={{ marginTop: " 48px" }}>
            Optimism
          </Title>

          {optimismClientData?.attestations.length !== 0 ? (
            optimismClientData?.attestations.map(
              (attestations: any, idx: number) => (
                <Connection
                  recipientAddress={attestations.recipient}
                  timestamp={attestations.time}
                  key={idx}
                />
              )
            )
          ) : (
            <Empty />
          )}
        </>
      ) : (
        <>
          <Text type="warning">
            Please connect your wallet to view your connections.
          </Text>
          <Empty />
        </>
      )}
    </div>
  );
}
