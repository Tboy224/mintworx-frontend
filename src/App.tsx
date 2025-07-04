// App.tsx
import '@rainbow-me/rainbowkit/styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from './wagmiConfig';

import PrivateKeyPage from '../PrivateKeyPage';
import ContractScanPage from '../ContractScanPage';
import MintBotDashboard from '../MintBotDashboard';

const config = wagmiConfig;
const queryClient = new QueryClient();

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          <Router>
            <Routes>
              <Route path="/" element={<PrivateKeyPage />} />
              <Route path="/scan" element={<ContractScanPage />} />
              <Route path="/dashboard" element={<MintBotDashboard />} />
            </Routes>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
