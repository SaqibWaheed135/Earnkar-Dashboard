import { Home, ShoppingCart, Users, Settings, Moon, Banknote } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../assets/eanrkarlogo.png'

export default function Sidebar() {
    return (
        <div className="sidebar">

            <img
                src={Logo}
                alt="EarnKar Logo"
                style={{ width: '100px', height: '70px', margin:20, marginLeft:40, borderRadius:10}}
            />

            <nav>
                <ul>
                    <li><Home size={18} /> Dashboard</li>
                    <li><Link to="/withdraw"><Banknote size={18} />Withdraw</Link></li>
                    <li><Users size={18} /> Customers</li>
                    <li><Settings size={18} /> Settings</li>
                </ul>
            </nav>
            <div className="bottom">
                <Moon size={16} /> Dark Mode
            </div>
        </div>
    );
}
