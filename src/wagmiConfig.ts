// wagmiConfig.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import {
  base,
  mainnet,
  arbitrum,
  polygon,
  optimism,
  avalanche,
} from 'viem/chains';

const projectId = 'e6c376f9243c66b0a473775a22ded1f0';

 const chns = [base, mainnet, arbitrum, polygon, optimism, avalanche];

export const wagmiConfig = getDefaultConfig({
  appName: 'My App',
  projectId,
  chains: [base, mainnet, arbitrum, polygon, optimism, avalanche],
  transports: Object.fromEntries(chns.map((chain) => [chain.id, http()])),
  ssr: true,
});
