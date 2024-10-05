"use client";

import BlockchainHashDisplay from "./blockchain_hash";
import { useState, useEffect, useCallback } from "react";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import Image from "next/image";
// import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

const formatAddress = (addr) => {
  return `${addr?.substring(0, 8)}...`;
};

export default function Navbar() {
  const host =
    typeof window !== "undefined"
      ? window.location.href
      : "http://localhost:3000";

  const [worldId, setWorldId] = useState("");

  const [account, setAccount] = useState();

  //   const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = useCallback(async () => {
      const ethereum = window.ethereum;
      // Check if MetaMask is installed
      if (typeof ethereum !== "undefined") {
          try {
        // Request access to the user's MetaMask accounts
        // ethereum.connect();
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
            //   "params": [
                //     '0x8274f'
                //   ],
            });
            window.ethereum.enable();
        // Sign a message to confirm ownership
        //       const messageToSign = "SHIFT in"; // Customize this message

        // window.ethereum.request({
        //       method: 'personal_sign',
        //       params: [messageToSign, accounts[0]],
        // })
        //   const signature = await web3.eth.personal.sign(messageToSign, accounts[0]);

        // Get the connected Ethereum address
        // const address = ethereum.selectedAddress;
        const address = accounts[0];
        setAccount(address);
        // Check address in console of web browser
        // console.log("connected to MetaMask with address: ", address);
      } catch (error) {
        alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
      }
    } else {
      alert("MetaMask not installed");
    }
  }, []);

  const disconnect = () => {
    setAccount();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("worldId")) {
        setWorldId(localStorage.getItem("worldId"));
      }
      if (window.ethereum && window.ethereum.isConnected) {
        setAccount(window.ethereum.selectedAddress);
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
    <nav className="navbar bg-white z-50">
      <Image src="/shift.png" alt="Shift Logo" width={100} height={50} />
      <Popover>
            <PopoverTrigger>
            <div className="flex align-middle justify-center">
                <Image
                  className="mr-4 my-auto"
                  src="/worldcoin.png"
                  width={20}
                  height={20}
                />
      {worldId != "" && (
        <BlockchainHashDisplay hash={worldId} />
      )}
      {
        worldId == "" && (
            <p className="text-black">
            Not Verified
        </p>
        )
      }
                </div>
            </PopoverTrigger>
            <PopoverContent className="mt-2 w-44 bg-gray-100 border rounded-md shadow-lg right-0 z-10 top-10">
              <button
                onClick={() => {
                    localStorage.setItem("worldId", "");
                    setWorldId("");
                }}
                className="block w-full pl-2 pr-4 py-2 text-left text-[#F05252] hover:bg-gray-200">
                Disconnect
              </button>
            </PopoverContent>
          </Popover>
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
        ) : account ? (
          <Popover>
            <PopoverTrigger>
              <button className="flex align-middle justify-center">
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
      </button>
    </nav>
  );
}
