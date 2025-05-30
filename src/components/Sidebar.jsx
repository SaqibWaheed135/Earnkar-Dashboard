import { Home, ShoppingCart, Users, Settings, Moon, Banknote } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/eanrkarlogo.png'
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

export default function Sidebar() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return (
        <div className="sidebar">

            <img
                src={Logo}
                alt="EarnKar Logo"
                style={{ width: '100px', height: '70px', margin: 20, marginLeft: 40, borderRadius: 10 }}
            />

            <nav>
                <ul>
                    <li><Home size={18} /> Dashboard</li>
                    <li><Link to="/withdraw"><Banknote size={18} />Withdraw</Link></li>
                    <li><Link to="/users"><Users size={18} />Users</Link></li>
                    <li><Settings size={18} /> Settings</li>
                </ul>
            </nav>
            <div className="bottom">
                <button onClick={handleLogout} style={styles.logoutBtn}>
                    Logout
                </button>
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
}