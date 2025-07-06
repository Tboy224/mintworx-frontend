// App.tsx
import '@rainbow-me/rainbowkit/styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { useAccount, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from './wagmiConfig';

import ConnectSite from '../Connect.tsx'
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
              <Route path="/" element={<AutoRoute />} />

              <Route path="/scan" element={<ProtectedRoute><ContractScanPage /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><MintBotDashboard /></ProtectedRoute>} />
            </Routes>

          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function AutoRoute() {
  const {isConnected} = useAccount();
  return isConnected ? <MintBotDashboard /> : <ConnectSite />
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  return isConnected ? children : <ConnectSite />;
}

