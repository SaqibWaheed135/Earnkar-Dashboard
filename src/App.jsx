import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Withdraw from './Pages/Withdraw';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import UsersList from './Pages/Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Protected Routes inside layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/withdraw"
          element={
            <ProtectedRoute>
              <Layout>
                <Withdraw />
              </Layout>
            </ProtectedRoute>
          }
        />

          <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Layout>
                <UsersList/>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
