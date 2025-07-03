import React, { useState } from "react";

const MintBotDashboard: React.FC = () => {
  const [speed, setSpeed] = useState<"normal" | "mid" | "high">("normal");

  return (
    <div className="relative flex flex-col items-center justify-center w-screen min-h-screen bg-[#0f172a] overflow-hidden text-white p-6">

      {/* Glowing Orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse delay-200" />
      </div>

      <div className="relative z-10 w-full max-w-4xl p-8 bg-white/5 text-white rounded-3xl shadow-2xl backdrop-blur-md border border-white/20">
        {/* Top Bar */}
        <div className="flex justify-between mb-4">
          <div className="border border-gray-500 px-3 py-1 rounded">Network</div>
          <div className="border border-gray-500 px-3 py-1 rounded">0x32..</div>
        </div>

        {/* NFT Details */}
        <div className="border border-gray-500 p-4 mb-6 rounded">
          <div className="text-center mb-2 font-bold text-gray-200">NFT Details</div>
          <ul className="space-y-1 pl-4 text-gray-300">
            <li>name</li>
            <li>symbol</li>
            <li>total supply for mint</li>
            <li>start time</li>
          </ul>
        </div>

        {/* Speed Selection */}
        <div className="border border-gray-500 p-4 mb-6 rounded">
          <div className="flex justify-between mb-2 text-sm text-gray-400">
            <span className={speed === "normal" ? "text-white font-semibold" : ""}>
              normal
            </span>
            <span className={speed === "mid" ? "text-white font-semibold" : ""}>
              mid
            </span>
            <span className={speed === "high" ? "text-white font-semibold" : ""}>
              high
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={2}
            step={1}
            value={["normal", "mid", "high"].indexOf(speed)}
            onChange={(e) => {
              const index = parseInt(e.target.value);
              setSpeed(["normal", "mid", "high"][index] as "normal" | "mid" | "high");
            }}
            className="w-full accent-white"
          />
        </div>

        {/* Buttons */}
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

