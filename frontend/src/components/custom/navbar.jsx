"use client";

import BlockchainHashDisplay from "./blockchain_hash";
import { useState, useEffect } from "react";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { cookieStorage, createStorage, http } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, arbitrum } from "@reown/appkit/networks";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import Image from "next/image";
import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

const formatAddress = (addr) => {
  return `${addr?.substring(0, 8)}...`;
};

export default function Navbar() {
  const host =
    typeof window !== "undefined" ? window.location.href : "http://localhost:3000";

  const sdkOptions = {
    logging: { developerMode: true },
    checkInstallationImmediately: true,
    dappMetadata: {
      name: "SHIFT",
      url: host, // using the host constant defined above
    },
    infuraAPIKey: process.env.NEXT_PUBLIC_INFURA_API_KEY,
  };
  const [worldId, setWorldId] = useState("");

  const { sdk, connected, connecting, account } = useSDK();

  const connect = async () => {
    console.log(sdkOptions);
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("worldId")) {
        setWorldId(localStorage.getItem("worldId"));
      }
    }
  }, []);

  const onSuccess = (result) => {
    // This is where you should perform frontend actions once a user has been verified
    if (typeof window !== "undefined") {
      setWorldId(result.nullifier_hash);
      localStorage.setItem("worldId", result.nullifier_hash);
    }
    // window.alert(
    // 	`Successfully verified with World ID!
    // Your nullifier hash is: ` + result.nullifier_hash
    // )
  };

  const verifyProof = async (proof) => {
    const response = await fetch("/api/verify", {
      // route to your backend will depend on implementation
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
    });
    if (response.ok) {
      console.log("Success");
      // const { verified } = await response.json();
      // return verified;
    } else {
      console.log("Verified fail");
      // const { code, detail } = await response.json();
      // throw new Error(`Error Code ${code}: ${detail}`);
    }
  };

  return (
    <nav className="navbar">
      <Image src="/shift.png" alt="Shift Logo" width={100} height={50} />
      {worldId != "" && <BlockchainHashDisplay hash={worldId} />}
      <button className="retro">
        {worldId == "" ? (
          <IDKitWidget
            app_id="app_staging_2bf37d8b2d567c4c10b784c836ea26f9"
            action="testing"
            false
            verification_level={VerificationLevel.Device}
            handleVerify={verifyProof}
            onSuccess={onSuccess}>
            {({ open }) => (
              <button
                onClick={open}
                className="flex align-middle justify-center">
                <Image
                  className="mr-4 my-auto"
                  src="/worldcoin.png"
                  width={20}
                  height={20}
                />
                Login
              </button>
            )}
          </IDKitWidget>
        ) : (
          <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
            {connected ? (
              <Popover>
                <PopoverTrigger>
                  <button>
                    <Image
                      className="mr-4 my-auto"
                      src="/scroll.png"
                      width={20}
                      height={20}
                    />
                    {formatAddress(account)}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="mt-2 w-44 bg-gray-100 border rounded-md shadow-lg right-0 z-10 top-10">
                  <button
                    onClick={disconnect}
                    className="block w-full pl-2 pr-4 py-2 text-left text-[#F05252] hover:bg-gray-200">
                    Disconnect
                  </button>
                </PopoverContent>
              </Popover>
            ) : (
              <button
                disabled={connecting}
                onClick={connect}
                className="flex align-middle justify-center">
                <Image
                  className="mr-4 my-auto"
                  src="/unscroll.png"
                  width={20}
                  height={20}
                />
                Connect
              </button>
            )}
          </MetaMaskProvider>
        )}
      </button>
    </nav>
  );
}
