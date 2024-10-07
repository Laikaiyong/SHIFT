"use client";

import { useEffect } from "react";
import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const formatAddress = (addr) => {
  return `${addr?.substring(0, 8)}...`;
};

export default function Navbar() {
  const host =
    typeof window !== "undefined"
      ? window.location.href
      : "http://localhost:3000";


  useEffect(() => {
  }, []);

  return (
    <nav className="navbar bg-white z-40">
      <Image src="/breaks.png" alt="Shift Logo" width={100} height={50} />
      <WalletMultiButton className="z-50" />
    </nav>
  );
}
