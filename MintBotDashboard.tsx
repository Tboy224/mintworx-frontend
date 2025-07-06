
import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ProxyService } from './lib/proxyService';
import { useChainId } from 'wagmi';
import { checkPrivateKeyBalance } from './lib/checkBal';

const MintBotDashboard: React.FC = () => {
  const [speedValue, setSpeedValue] = useState(0);
  const [privateKey, setPrivateKey] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const proxy = new ProxyService();
  const chainId = useChainId();

  const getSpeedLabel = () => {
    if (speedValue < 33) return "normal";
    if (speedValue < 66) return "mid";
    return "high";
  };

  const handleMint = async () => {
    if (!privateKey.trim()) {
      setErrorMessage('Please enter your private key.');
      return;
    }

    if (!contractAddress.trim()) {
      setErrorMessage('Please enter the contract address.');
      return;
    }
   const check = await checkPrivateKeyBalance(privateKey, chainId);
    if (!check.valid) {
      setErrorMessage('❌ Invalid private key or unsupported chain.');
      return;
    }

    if (!check.funded) {
      setErrorMessage(` Insufficient funds (~$${check.usdValue?.toFixed(2)}). Minimum $2 required.`);
      return;
    }

    const payload = {
      privateKey,
      contractAddress,
      chainId,
      gasMultiplier: 1 + speedValue / 100,
    };

    setLoading(true);
    setShowSuccess(false);

    try {
      const result = await proxy.mint(payload);
      setLoading(false);

      if (result.success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setErrorMessage(`❌ Mint failed:\n${result.error}`);
      }
    } catch (err) {
      setLoading(false);
      console.error('Mint error:', err);
      setErrorMessage('⚠️ Unexpected error occurred during minting.');
    }
  };

  const handleCancel = async () => {
    try {
      const result = await proxy.cancel(privateKey);

      if (result.success) {
        setErrorMessage(`🛑 Mint cancelled:\n${result.message}`);
      } else {
        setErrorMessage(`❌ Cancel failed:\n${result.error}`);
      }
    } catch (err) {
      console.error('Cancel error:', err);
      setErrorMessage('⚠️ Unexpected error occurred while cancelling.');
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#0f172a] text-white p-0 m-0 relative">
      {/* Glowing Orbs */}
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

      <div className="relative z-10 w-full max-w-4xl p-8 bg-white/5 text-white rounded-3xl shadow-2xl backdrop-blur-md border border-white/20">

        {/* Contract Address Input */}
        <input
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="Enter contract address"
          className="w-full px-4 py-2 mb-4 rounded bg-white/10 border border-white/30 text-white placeholder-gray-400"
        />

        {/* NFT Details Box */}
        <div className="border border-gray-500 p-4 mb-6 rounded">
          <div className="text-center mb-2 font-bold text-gray-200">NFT Details</div>
          <ul className="space-y-1 pl-4 text-gray-300">
            <li>name</li>
            <li>symbol</li>
            <li>total supply for mint</li>
            <li>start time</li>
          </ul>
        </div>

        {/* Speed Slider */}
        <div className="border border-gray-500 p-4 mb-6 rounded">
          <div className="flex justify-between mb-2 text-sm text-gray-400">
            <span className={getSpeedLabel() === "normal" ? "text-white font-semibold" : ""}>normal</span>
            <span className={getSpeedLabel() === "mid" ? "text-white font-semibold" : ""}>mid</span>
            <span className={getSpeedLabel() === "high" ? "text-white font-semibold" : ""}>high</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={speedValue}
            onChange={(e) => setSpeedValue(Number(e.target.value))}
            className="w-full accent-white"
          />
        </div>

        {/* Private Key Input */}
        <input
          type="text"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder="Enter private key"
          className="w-full px-4 py-2 mb-4 rounded bg-white/10 border border-white/30 text-white placeholder-gray-400"
        />

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleMint}
            className="border border-gray-400 text-white px-4 py-2 rounded hover:bg-white hover:text-black transition">
            Activate Bot
          </button>
          <button
            onClick={handleCancel}
            className="border border-gray-400 text-white px-4 py-2 rounded hover:bg-white hover:text-black transition">
            Deactivate Bot
          </button>
        </div>
      </div>

      {/* Loading Modal */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="animate-spin h-10 w-10 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-black">Loading...</p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-100 rounded-full p-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-black mb-2">Success</h2>
            <p className="text-sm text-gray-600">Your mint was successful!</p>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {errorMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80 border-l-4 border-red-500">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-100 rounded-full p-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-black mb-2">Error</h2>
            <p className="text-sm text-gray-600 whitespace-pre-line">{errorMessage}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              onClick={() => setErrorMessage('')}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MintBotDashboard;

