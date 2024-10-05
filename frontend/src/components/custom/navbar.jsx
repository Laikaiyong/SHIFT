"use client";

import BlockchainHashDisplay from "./blockchain_hash";
import { useState, useEffect } from "react";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import Image from "next/image";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      if (localStorage.getItem("worldId")) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const onSuccess = (result) => {
    // This is where you should perform frontend actions once a user has been verified
    setIsLoggedIn(true);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("worldId", result.nullifier_hash);
    }
    // window.alert(
    // 	`Successfully verified with World ID!
    // Your nullifier hash is: ` + result.nullifier_hash
    // )
  };

  const verifyProof = async (proof) => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("worldId", nullifier_hash);
    }
    console.log("proof", proof);
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

  const handleWalletConnect = async () => {
    try {
      const provider = await EthereumProvider.init({
        projectId: "28569148dfa0ea0482a80c1e292af6ec",
        chains: [534351], // Scroll Sepolia testnet chain ID
        rpcMap: {
          534351: "https://sepolia-rpc.scroll.io/", // Scroll Sepolia testnet RPC URL
        },
        showQrModal: true,
        qrModalOptions: {
          themeMode: "light",
        },
      });
      await provider.connect();
      console.log("WalletConnect connected to Scroll Sepolia testnet");
    } catch (error) {
      console.error("WalletConnect error:", error);
    }
  };

  return (
    <nav className="navbar">
      <Image src="/shift.png" alt="Shift Logo" width={100} height={50} />
      <button className="retro">
        {localStorage.getItem("worldId") && (
          <BlockchainHashDisplay hash={localStorage.getItem("worldId")} />
        )}
        {!isLoggedIn || localStorage.getItem("worldId") ? (
          <IDKitWidget
            app_id="app_staging_2bf37d8b2d567c4c10b784c836ea26f9"
            action="testing"
            false
            verification_level={VerificationLevel.Device}
            handleVerify={verifyProof}
            onSuccess={onSuccess}>
            {({ open }) => (
              <button onClick={open} className="flex align-middle justify-center">
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
          <button onClick={handleWalletConnect} className="flex">
            <Image className="mr-4" src="/scroll.png" width={20} height={20} />
            Connect
          </button>
        )}
      </button>
    </nav>
  );
}
