import './index.css';
import Sidebar from './components/Sidebar';
import Dashboard from './Pages/Dashboard';
import Withdraw from './Pages/Withdraw';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/withdraw" element={<Withdraw />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
