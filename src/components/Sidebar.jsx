import { Home, Users, Settings, Banknote, ChevronDown, ChevronUp, LayoutDashboard, List } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/eanrkarlogo.png';
import { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

export default function Sidebar() {
    const { logout } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    const [adMenuOpen, setAdMenuOpen] = useState(false);

    const confirmLogout = () => {
        setShowModal(true); // Show modal
    };
    const handleLogout = () => {
        logout();
        navigate('/');
    };


  return (
  <div className="sidebar">
    {/* Logout Modal */}
    {showModal && (
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
          <h3>Are you sure you want to logout?</h3>
          <div style={styles.modalButtons}>
            <button onClick={handleLogout} style={styles.confirmBtn}>Yes</button>
            <button onClick={() => setShowModal(false)} style={styles.cancelBtn}>No</button>
          </div>
        </div>
      </div>
    )}

    {/* Rest of your sidebar content */}
    <img
      src={Logo}
      alt="EarnKar Logo"
      style={{ width: '100px', height: '70px', margin: 20, marginLeft: 40, borderRadius: 10 }}
    />

    <nav>
      <ul>
        <li><Link to="/dashboard"><Home size={18} /> Dashboard</Link></li>
        <li><Link to="/withdraw"><Banknote size={18} /> Withdraw</Link></li>
        <li><Link to="/users"><Users size={18} /> Users</Link></li>

        <li onClick={() => setAdMenuOpen(!adMenuOpen)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <LayoutDashboard size={18} /> Ad System
          </div>
          {adMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </li>

        {adMenuOpen && (
          <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
            <li><Link to="/ads" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><LayoutDashboard size={16} /> Add Ad</Link></li>
            <li><Link to="/ads-lists" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><List size={16} /> Ad Lists</Link></li>
          </ul>
        )}

        <li><Settings size={18} /> Settings</li>
      </ul>
    </nav>

    <div className="bottom">
      <button onClick={confirmLogout} style={styles.logoutBtn}>Logout</button>
    </div>
  </div>
);

}

const styles = {
    logoutBtn: {
        backgroundColor: '#A4508B',
        color: '#fff',
        border: '1px solid white',
        padding: '6px 12px',
        borderRadius: 4,
        cursor: 'pointer',
        fontSize: 14,
        transition: 'backgroundColor 0.2s ease',
        width: '100%',
        height: 40
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '30px 20px',
        borderRadius: '8px',
        textAlign: 'center',
        width: '300px',
    },
    modalButtons: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    confirmBtn: {
        backgroundColor: '#A4508B',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    cancelBtn: {
        backgroundColor: '#ccc',
        color: '#000',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
    },

};
