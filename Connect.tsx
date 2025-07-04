import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function ConnectSite() {
  return (
        <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Glowing Backgrounds */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse delay-200" />
      </div>

      {/* Center Box */}
      <div className="relative z-10 max-w-md w-full p-8 bg-white/5 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-md text-center">
        <ConnectButton />
      </div>
    </div>
  );
}
