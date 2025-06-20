import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Withdraw from './Pages/Withdraw';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import UsersList from './Pages/Users';
import AddAdForm from './Pages/Ads';
import AdList from './Pages/AdLists';
import EditAdForm from './components/EditAdForm';

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

        <Route
          path="/ads"
          element={
            <ProtectedRoute>
              <Layout>
                <AddAdForm/>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/ads-lists"
          element={
            <ProtectedRoute>
              <Layout>
                <AdList/>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="/ads/edit/:id" element={<EditAdForm />} />

      </Routes>
    </Router>
  );
}

export default App;
