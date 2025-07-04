import React, { useState } from "react";

const MintBotDashboard: React.FC = () => {
  const [speedValue, setSpeedValue] = useState(0); // Smooth slider from 0 to 100

  const getSpeedLabel = () => {
    if (speedValue < 33) return "normal";
    if (speedValue < 66) return "mid";
    return "high";
  };

  return (
    <div className="min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#0f172a] text-white p-0 m-0 relative">
      {/* Glowing Orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse delay-200" />
      </div>

      <div className="relative z-10 w-full max-w-4xl p-8 bg-white/5 text-white rounded-3xl shadow-2xl backdrop-blur-md border border-white/20">
        {/* Top Right Boxes */}
        <div className="flex justify-end gap-2 mb-4">
          <div className="border border-gray-500 px-3 py-1 rounded">Network</div>
          <div className="border border-gray-500 px-3 py-1 rounded">0x32..</div>
        </div>

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

        {/* Smooth Speed Slider */}
        <div className="border border-gray-500 p-4 mb-6 rounded">
          <div className="flex justify-between mb-2 text-sm text-gray-400">
            <span className={getSpeedLabel() === "normal" ? "text-white font-semibold" : ""}>
              normal
            </span>
            <span className={getSpeedLabel() === "mid" ? "text-white font-semibold" : ""}>
              mid
            </span>
            <span className={getSpeedLabel() === "high" ? "text-white font-semibold" : ""}>
              high
            </span>
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

        {/* Activate/Deactivate Buttons */}
        <div className="flex justify-between">
          <button className="border border-gray-400 text-white px-4 py-2 rounded hover:bg-white hover:text-black transition">
            Activate Bot
          </button>
          <button className="border border-gray-400 text-white px-4 py-2 rounded hover:bg-white hover:text-black transition">
            Deactivate Bot
          </button>
        </div>
      </div>
    </div>
  );
};

export default MintBotDashboard;
