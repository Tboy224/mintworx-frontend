import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const ContractScanPage: React.FC = () => {
  const navigate = useNavigate();
  const [contractAddress, setContractAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleScan = () => {
    // Temporary validation
    if (!contractAddress.startsWith("0x") || contractAddress.length !== 42) {
      setError("Invalid contract address. Must start with '0x' and be 42 characters long.");
      setSuccess(false);
      return;
    }

    // You can later replace this with a real SeaDrop check via an API or ABI inspection
    const isSeaDrop = true;

    setError("");
    setSuccess(true);

    setTimeout(() => {
      navigate("/dashboard", {
        state: {
          isSeaDrop,
          contractAddress,
        },
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex items-center justify-center bg-[#0f172a] text-white p-6 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse delay-200" />
      </div>

      <div className="absolute top-4 right-4 z-50">
        <ConnectButton
          showBalance={false}
          accountStatus="address"
          chainStatus="icon"
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl p-8 bg-white/5 text-white rounded-3xl shadow-2xl backdrop-blur-md border border-white/20">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter contract address"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            className="w-full p-2 text-white rounded border border-gray-400 focus:outline-none"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          {success && <p className="text-green-400 text-sm">Scan successful!</p>}
          <button
            onClick={handleScan}
            className="mx-auto block px-6 py-2 border border-gray-400 rounded hover:bg-white hover:text-black transition"
          >
            Scan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractScanPage;
