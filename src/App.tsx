import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConnectWalletPage from "../ConnectWalletPage";
import PrivateKeyPage from "../PrivateKeyPage";
import ContractScanPage from "../ContractScanPage";
import MintBotDashboard from "../MintBotDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConnectWalletPage />} />
        <Route path="/private-key" element={<PrivateKeyPage />} />
        <Route path="/scan" element={<ContractScanPage />} />
        <Route path="/dashboard" element={<MintBotDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
