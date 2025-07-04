// App.tsx or main routing file
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateKeyPage from "../PrivateKeyPage";
import ContractScanPage from "../ContractScanPage";
import MintBotDashboard from "../MintBotDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateKeyPage />} />
        <Route path="/scan" element={<ContractScanPage />} />
        <Route path="/dashboard" element={<MintBotDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

